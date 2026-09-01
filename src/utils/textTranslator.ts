import { GovernmentAction } from '../types';
import { Language } from '../locales/translations';

// English to Korean dictionary
const EN_TO_KO_MAP: Record<string, { category: string; summaryPrefix: string }> = {
  'aerial search': {
    category: '항공 수색 및 헬리콥터 긴급 공수',
    summaryPrefix: '네팔 육군 MI-17 헬리콥터를 투입하여 고립 주민을 공중 구조하고 비상 의약품을 긴급 투하했습니다.',
  },
  'helicopter': {
    category: '항공 수색 및 헬리콥터 긴급 공수',
    summaryPrefix: '네팔 육군 헬리콥터 편대를 파견하여 고립 수재민을 신속 구조하고 구호품을 투하했습니다.',
  },
  'highway': {
    category: '주요 간선 고속도로 토사 준설 및 긴급 복구',
    summaryPrefix: '중장비 굴착기를 대거 투입하여 주요 고속도로 산사태 토사를 준설하고 임시 통행을 재개했습니다.',
  },
  'road': {
    category: '주요 간선 고속도로 토사 준설 및 긴급 복구',
    summaryPrefix: '도로 복구 장비를 급파하여 유실 도로를 복구하고 차량 소통을 지원했습니다.',
  },
  'relief': {
    category: '긴급 구호 패키지 및 임시 식수 정화 시설 설치',
    summaryPrefix: '수해 대피소에 긴급 식량, 방수포 및 식수 정화 알약을 대대적으로 보급했습니다.',
  },
  'embankment': {
    category: '강 유역 제방 보강 및 수해 취약지 대피',
    summaryPrefix: '취약 하천 제방을 긴급 보강하고 저지대 침수 우려 지역 주민을 사전 대피시켰습니다.',
  },
  'medical': {
    category: '비상 의료지원단 및 이동식 진료소 가동',
    summaryPrefix: '이동식 진료소를 긴급 개설하여 부상자를 치료하고 수인성 전염병 예방 활동을 전개했습니다.',
  },
  'satellite': {
    category: '통신망 복구 및 임시 위성 통신 기지국 설치',
    summaryPrefix: '통신 두절 산간 오지에 긴급 위성 단말기를 설치하여 비상 통신망을 복구했습니다.',
  },
  'bridge': {
    category: '교량 붕괴 구간 임시 조립교(Bailey Bridge) 가설',
    summaryPrefix: '유실된 주요 교량 구간에 신속 가설 조립교를 설치하여 비상 보급로를 확보했습니다.',
  },
  'customs': {
    category: '국제 인도주의 구호 물품 통관 패스트트랙 운영',
    summaryPrefix: '공항 내 긴급 통관 창구를 24시간 가동하여 해외 지원 구호 물품을 신속 통관했습니다.',
  }
};

// Korean to English dictionary
const KO_TO_EN_MAP: Record<string, { category: string; summary: string }> = {
  '항공 수색 및 헬리콥터 긴급 공수': {
    category: 'Aerial Search & Helicopter Airlift Operations',
    summary: 'Nepal Army deployed MI-17 helicopters to airlift stranded flood victims in Kavrepalanchok and Sindhulpalchok and airdrop emergency medical supplies.'
  },
  '주요 간선 고속도로 토사 준설 및 긴급 복구': {
    category: 'Highway Clearance & Heavy Debris Removal',
    summary: 'Department of Roads deployed heavy excavators to clear landslide blockages on Prithvi and Tribhuvan Highways, restoring access for emergency convoys.'
  },
  '긴급 구호 패키지 및 임시 식수 정화 시설 설치': {
    category: 'Relief Package & Emergency Water Supply Distribution',
    summary: 'NDRRMA in coordination with the Nepal Red Cross distributed family food rations, tarpaulins, and mobile water purification kits across relief shelters.'
  },
  '강 유역 제방 보강 및 수해 취약지 대피': {
    category: 'River Basin Embankment Reinforcement & Evacuation',
    summary: 'Armed Police Force (APF) and civil engineers reinforced vulnerable flood embankments along river basins and evacuated residents from low-lying zones.'
  },
  '경찰·준군사조직 수중 특수 구조대 급파': {
    category: 'Specialized Aquatic Search & Rapid Rescue Operations',
    summary: 'APF motorized inflatable boat teams deployed into raging flood torrents, safely rescuing trapped survivors from submerged structures.'
  },
  '비상 의료지원단 및 이동식 진료소 가동': {
    category: 'Mobile Medical Camps & Waterborne Disease Control',
    summary: 'Dispatched rapid-response health teams to administer cholera vaccines, oral rehydration salts, and first aid treatment to displaced persons.'
  },
  '통신망 복구 및 임시 위성 통신 기지국 설치': {
    category: 'Emergency Satellite Communications Restoration',
    summary: 'Nepal Telecom and military signal corps erected portable satellite terminals and solar microgenerators to re-establish emergency telecommunications in isolated valleys.'
  },
  '교량 붕괴 구간 임시 조립교(Bailey Bridge) 가설': {
    category: 'Temporary Modular Bailey Bridge Construction',
    summary: 'Army engineering brigades initiated rapid assembly of steel modular Bailey bridges over damaged river crossings to reconnect critical supply lifelines.'
  },
  '국제 인도주의 구호 물품 통관 패스트트랙 운영': {
    category: 'Humanitarian Cargo Fast-Track Customs Clearance',
    summary: 'Established 24/7 dedicated customs corridors at Tribhuvan International Airport to expedite the clearance and dispatch of international relief supplies.'
  },
  '현장 긴급 수색 및 대피 지원': {
    category: 'On-Site Search & Civilian Evacuation Support',
    summary: 'Joint disaster command teams are actively conducting ground search and evacuation operations in severely affected sectors.'
  },
  '주요 간선망 복구 작업': {
    category: 'Arterial Road Network Restoration Operations',
    summary: 'Heavy earth-moving equipment dispatched to clear landslide blockages along critical transit arteries.'
  },
  '긴급 구호 물품 배급': {
    category: 'Emergency Relief Supplies & Drinking Water Distribution',
    summary: 'Distributing dry food, hygiene supplies, and installing mobile water purification units in designated shelters.'
  },
  '현장 긴급 수색 및 구조': {
    category: 'Search, Rescue & Emergency Evacuation',
    summary: 'Emergency response headquarters deployed personnel for field search and civilian rescue operations.'
  },
  '긴급 구호 물품 지원': {
    category: 'Emergency Relief Package Distribution',
    summary: 'Distributing clean water, food rations, and medical kits to shelters in affected communities.'
  }
};

/**
 * Returns the localized Category & Summary for a Government Action
 */
export function getLocalizedAction(action: GovernmentAction, language: Language): { category: string; summary: string } {
  if (language === 'ko') {
    // If Korean explicit translation exists, use it
    if (action.category_ko && action.summary_ko) {
      return { category: action.category_ko, summary: action.summary_ko };
    }
    
    // Check if category is in Korean already
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(action.category);
    if (isKorean) {
      return { category: action.category, summary: action.summary };
    }

    // Try translating English to Korean
    const catLower = action.category.toLowerCase();
    for (const [key, val] of Object.entries(EN_TO_KO_MAP)) {
      if (catLower.includes(key)) {
        return { category: val.category, summary: action.summary_ko || val.summaryPrefix };
      }
    }

    return {
      category: action.category_ko || action.category,
      summary: action.summary_ko || action.summary,
    };
  }

  // Language is English (EN)
  // Check if category has Korean characters that need translation to English
  const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(action.category);
  if (isKorean) {
    const directMatch = KO_TO_EN_MAP[action.category.trim()];
    if (directMatch) {
      return directMatch;
    }

    // Keyword match
    const cat = action.category;
    if (cat.includes('헬리콥터') || cat.includes('항공') || cat.includes('공수')) {
      return {
        category: 'Aerial Search & Helicopter Airlift Operations',
        summary: 'Nepal Army deployed MI-17 helicopters to airlift stranded flood victims and airdrop emergency medical supplies.'
      };
    }
    if (cat.includes('고속도로') || cat.includes('도로') || cat.includes('토사') || cat.includes('준설')) {
      return {
        category: 'Highway Clearance & Heavy Debris Removal',
        summary: 'Department of Roads deployed heavy excavators to clear landslide blockages on Prithvi and Tribhuvan Highways, restoring access.'
      };
    }
    if (cat.includes('구호') || cat.includes('식수') || cat.includes('배급')) {
      return {
        category: 'Relief Package & Emergency Water Supply Distribution',
        summary: 'NDRRMA in coordination with the Red Cross distributed family food rations, tarpaulins, and mobile water purification kits.'
      };
    }
    if (cat.includes('제방') || cat.includes('대피')) {
      return {
        category: 'River Basin Embankment Reinforcement & Evacuation',
        summary: 'Armed Police Force reinforced flood embankments along river basins and evacuated residents from low-lying zones.'
      };
    }
    if (cat.includes('의료') || cat.includes('방역') || cat.includes('진료')) {
      return {
        category: 'Mobile Medical Camps & Waterborne Disease Control',
        summary: 'Dispatched rapid-response health teams to administer cholera vaccines, oral rehydration salts, and first aid treatment.'
      };
    }
    if (cat.includes('통신') || cat.includes('위성')) {
      return {
        category: 'Emergency Satellite Communications Restoration',
        summary: 'Nepal Telecom and military signal corps erected portable satellite terminals to re-establish emergency telecommunications.'
      };
    }
    if (cat.includes('교량') || cat.includes('조립교')) {
      return {
        category: 'Temporary Modular Bailey Bridge Construction',
        summary: 'Army engineering brigades initiated rapid assembly of steel modular Bailey bridges over damaged river crossings.'
      };
    }
    if (cat.includes('통관') || cat.includes('공항')) {
      return {
        category: 'Humanitarian Cargo Fast-Track Customs Clearance',
        summary: 'Established 24/7 dedicated customs corridors at Tribhuvan International Airport to expedite the clearance of international relief supplies.'
      };
    }
  }

  return {
    category: action.category || 'Government Relief Operation',
    summary: action.summary || 'Emergency operational measures underway across affected disaster zones.',
  };
}

/**
 * Returns localized source summary string
 */
export function getLocalizedSourceSummary(source: string | undefined | null, source_ko: string | undefined | null, language: Language): string {
  if (language === 'ko') {
    if (source_ko) return source_ko;
    if (source && /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(source)) return source;
    return '네팔 국가재난위험경감관리청(NDRRMA) 및 내무부 공식 브리핑';
  }

  // Language is English (EN)
  if (source && !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(source)) {
    return source;
  }

  return 'NDRRMA Situation Report No. 5 & Ministry of Home Affairs Official Briefing';
}
