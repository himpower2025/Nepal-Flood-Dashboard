import { DailyReport } from '../types';
import { getSelectableDateRange } from '../utils/dateUtils';

const SAMPLE_ACTION_TEMPLATES = [
  [
    {
      rank: 1,
      category: "Aerial Search & Helicopter Airlift Operations",
      summary: "Nepal Army deployed 4 MI-17 helicopters to conduct 38 sorties, successfully airlifting 420 stranded flood victims in Kavrepalanchok and Sindhulpalchok and airdropping 12 tons of emergency medical supplies.",
      category_ko: "항공 수색 및 헬리콥터 긴급 공수",
      summary_ko: "네팔 육군 MI-17 헬리콥터 4기를 투입하여 카브레팔란촉 및 신두팔촉 고립 주민 420여 명을 공중 구조하고 필수 의약품을 투하했습니다."
    },
    {
      rank: 2,
      category: "Highway Clearance & Heavy Debris Removal",
      summary: "Department of Roads deployed 35 heavy excavators and bulldozers to clear landslide blockages on Prithvi and Tribhuvan Highways, restoring temporary vehicular access for emergency convoys.",
      category_ko: "주요 간선 고속도로 토사 준설 및 긴급 복구",
      summary_ko: "프리트비 고속도로 및 트리부반 고속도로 산사태 지점에 중장비 35대를 급파하여 차선 임시 개통 및 고립 차량 통행을 재개했습니다."
    },
    {
      rank: 3,
      category: "Relief Package & Emergency Water Supply Distribution",
      summary: "NDRRMA in coordination with the Nepal Red Cross distributed family food packages, tarpaulins, and mobile water purification kits across 12 designated municipal relief shelters.",
      category_ko: "긴급 구호 패키지 및 임시 식수 정화 시설 설치",
      summary_ko: "재난재해관리청(NDRRMA)과 적십자가 협력하여 1,500가구 대상 쌀, 텐트, 정수 키트 배급 및 임시 대피소 12개소를 긴급 가동했습니다."
    }
  ],
  [
    {
      rank: 1,
      category: "River Basin Embankment Reinforcement & Evacuation",
      summary: "Armed Police Force (APF) and civil engineers reinforced 4.2 km of vulnerable flood embankments along the Bagmati and Koshi river basins, evacuating 2,100 residents from low-lying zones.",
      category_ko: "강 유역 제방 보강 및 수해 취약지 대피",
      summary_ko: "바그마티 및 코시 강 유역 수위 상승에 대비해 하류 저지대 주민 2,100명을 인근 고지대 공공시설로 사전 대피 완료했습니다."
    },
    {
      rank: 2,
      category: "Specialized Aquatic Search & Rapid Rescue Operations",
      summary: "APF motorized inflatable boat teams deployed into raging flood torrents, safely rescuing 85 trapped survivors from submerged residential structures.",
      category_ko: "경찰·준군사조직 수중 특수 구조대 급파",
      summary_ko: "네팔 무장경찰(APF) 보트 구조대 8개 분대를 급류 침수 지역에 투입하여 전복 가옥 내 생존자 85명을 안전하게 인양했습니다."
    },
    {
      rank: 3,
      category: "Mobile Medical Camps & Waterborne Disease Control",
      summary: "Dispatched 14 rapid-response health teams to administer cholera vaccines, oral rehydration salts, and first aid treatment to over 850 displaced persons.",
      category_ko: "비상 의료지원단 및 이동식 진료소 가동",
      summary_ko: "수인성 전염병 예방을 위해 중앙의료지원팀을 침수 지역 보건소에 파견하고 콜레라 백신 및 응급 구호품을 1차 보급했습니다."
    }
  ],
  [
    {
      rank: 1,
      category: "Emergency Satellite Communications Restoration",
      summary: "Nepal Telecom and military signal corps erected 6 portable satellite terminals and solar microgenerators to re-establish emergency telecommunications in isolated mountain valleys.",
      category_ko: "통신망 복구 및 임시 위성 통신 기지국 설치",
      summary_ko: "산간 고립 지역의 이동통신 기지국 전력 단절에 대응하여 네팔 텔레콤과 군용 이동식 위성 단말 6기를 긴급 배치했습니다."
    },
    {
      rank: 2,
      category: "Temporary Modular Bailey Bridge Construction",
      summary: "Army engineering brigades initiated rapid assembly of a 45-meter steel modular Bailey bridge over damaged river crossings to reconnect critical capital supply lifelines.",
      category_ko: "교량 붕괴 구간 임시 조립교(Bailey Bridge) 가설",
      summary_ko: "도로관리국 공병부대가 카트만두 진입 주요 교량 유실 지점에 45m 규모의 임시 강재 조립교 가설 작업을 착공했습니다."
    },
    {
      rank: 3,
      category: "Humanitarian Cargo Fast-Track Customs Clearance",
      summary: "Established 24/7 dedicated customs corridors at Tribhuvan International Airport to expedite the clearance and dispatch of international relief supplies and rescue equipment.",
      category_ko: "국제 인도주의 구호 물품 통관 패스트트랙 운영",
      summary_ko: "트리부반 국제공항에 재난 구호 전용 긴급 통관 창구를 개설하여 해외 지원 식량 및 수색 장비의 현장 배송 시간을 단축했습니다."
    }
  ]
];

export function generateDefaultSeedReports(): DailyReport[] {
  const dateItems = getSelectableDateRange();
  
  // Base stats that evolve over the timeline
  let baseDeceased = 192;
  let baseMissing = 64;
  let baseRescued = 3850;

  return dateItems.map((item, idx) => {
    const templateIdx = idx % SAMPLE_ACTION_TEMPLATES.length;
    const actions = SAMPLE_ACTION_TEMPLATES[templateIdx];
    
    // Increment realistic progression
    const deceased = baseDeceased + idx * 8;
    const missing = Math.max(12, baseMissing - idx * 7);
    const rescued = baseRescued + idx * 310;

    return {
      date: item.dateStr,
      stats: {
        deceased,
        missing,
        rescued,
      },
      top_government_actions: actions.map(a => ({ ...a })),
      source_summary: "NDRRMA Situation Report No. 5 & Ministry of Home Affairs Briefing",
      source_summary_ko: "네팔 국가재난위험경감관리청(NDRRMA) 및 내무부 재난대응 공식 브리핑",
      updatedAt: new Date().toISOString(),
    };
  });
}
