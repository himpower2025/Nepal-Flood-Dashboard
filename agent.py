import os
import json
import datetime
import requests
from bs4 import BeautifulSoup
import google.genai as genai
import firebase_admin
from firebase_admin import credentials, firestore

# 1. 날짜 설정 (전날 날짜 데이터 기준)
yesterday = (datetime.datetime.now() - datetime.timedelta(days=1)).strftime('%Y-%m-%d')

# 2. 크롤링 / 데이터 수집 (예시: 뉴스 RSS 또는 특정 웹페이지)
def fetch_raw_data():
    raw_texts = []
    # 예시: RSS 피드 수집 또는 주요 공공 뉴스 스크래핑
    urls = [
        "[https://thehimalayantimes.com/feed](https://thehimalayantimes.com/feed)",  # RSS 피드 예시
    ]
    for url in urls:
        try:
            res = requests.get(url, timeout=10)
            soup = BeautifulSoup(res.content, 'xml')
            items = soup.find_all('item')[:10]  # 최신 10개 기사
            for item in items:
                raw_texts.append(f"Title: {item.title.text}\nDescription: {item.description.text}")
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            
    return "\n\n---\n\n".join(raw_texts)

# 3. Gemini API (AI Studio) 호출
def run_ai_agent(scraped_content):
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    
    prompt = f"""
    Target Date: {yesterday}
    
    Raw Extracted Data/Articles:
    {scraped_content}
    
    Process the above data according to your System Instructions and return the JSON object.
    """
    
    response = client.models.generate_content(
        model='gemini-1.5-flash',
        contents=prompt,
        config={'response_mime_type': 'application/json'}
    )
    
    return json.loads(response.text)

# 4. Firebase Firestore 저장
def save_to_firebase(data):
    service_account_info = json.loads(os.getenv("FIREBASE_SERVICE_ACCOUNT"))
    cred = credentials.Certificate(service_account_info)
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
        
    db = firestore.client()
    # 'daily_reports' 컬렉션에 날짜(YYYY-MM-DD)를 문서 ID로 저장
    db.collection('daily_reports').document(yesterday).set(data)
    print(f"Successfully saved report for {yesterday} to Firebase!")

if __name__ == "__main__":
    print("Starting daily agent workflow...")
    content = fetch_raw_data()
    result = run_ai_agent(content)
    save_to_firebase(result)
