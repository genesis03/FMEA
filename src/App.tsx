import { useState } from 'react';
import { FMEAHeader, FMEAHeaderData } from './components/FMEAHeader';
import { FMEAForm, FMEARow } from './components/FMEAForm';
import { FMEAGuide } from './components/FMEAGuide';

// FMEAForm의 초기 행 데이터
const initialRow: FMEARow = {
  id: '1',
  item: '',
  function: '',
  failureMode: '',
  effectsOfFailure: '',
  severity: 1,
  causesOfFailure: '',
  occurrence: 1,
  currentControls: '',
  detection: 1,
  rpn: 1,
  recommendedActions: '',
  responsibility: '',
  targetDate: '',
  actionsTaken: '',
  newSeverity: 1,
  newOccurrence: 1,
  newDetection: 1,
  newRpn: 1,
};

export default function App() {
  // 모든 데이터를 App 컴포넌트에서 관리
  const [headerData, setHeaderData] = useState<FMEAHeaderData>({
    company: '',
    productName: '',
    productNumber: '',
    modelYear: '',
    team: '',
    preparedBy: '',
    datePrepared: '',
    approvedBy: '',
    dateApproved: '',
    revision: '1.0',
    page: '1 of 1',
    fmeaType: 'DFMEA',
    fmeaNumber: '',
  });

  const [fmeaRows, setFmeaRows] = useState<FMEARow[]>([initialRow]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        {/* 최대 너비를 2560px로 제한합니다. */}
        <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* FMEA 가이드를 하단으로 내리기 위해 Flexbox 레이아웃을 제거하고 수직 구조로 변경합니다. */}
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight">FMEA 분석 도구</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                고장 모드 및 영향 분석 (Failure Mode and Effects Analysis)
              </p>
            </div>

            <FMEAHeader headerData={headerData} setHeaderData={setHeaderData} />
            <FMEAForm rows={fmeaRows} setRows={setFmeaRows} />
            <FMEAGuide />
          </div>
        </div>
      </div>
    </div>
  );
}

