import { useState, useEffect } from 'react'; // useEffect import
import { FMEAHeader, FMEAHeaderData } from './components/FMEAHeader';
import { FMEAForm, FMEARow } from './components/FMEAForm';
import { FMEAGuide } from './components/FMEAGuide';
import { Button } from './components/ui/button';
import { Save, FolderDown } from 'lucide-react'; // FolderDown 아이콘 import
import { FMEAListDialog } from './components/FMEAListDialog'; // 새로 만든 컴포넌트 import

const initialHeaderData: FMEAHeaderData = {
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
};

const initialRow: FMEARow = {
    id: Date.now().toString(),
    // 'function' 속성은 파이썬 예약어 문제로 FMEAForm.tsx에서 제거했으므로 여기서도 제거합니다.
    item: '',
    failureMode: '',
    effectsOfFailure: '',
    severity: 1,
    classification: '',
    causesOfFailure: '',
    occurrence: 1,
    currentControlsPrevention: '',
    currentControlsDetection: '',
    detection: 1,
    rpn: 1,
    recommendedActions: '',
    responsibility: '',
    targetDate: '',
    actionsTaken: '',
    completionDate: '',
    newSeverity: 1,
    newOccurrence: 1,
    newDetection: 1,
    newRpn: 1,
};

export default function App() {
  const [headerData, setHeaderData] = useState<FMEAHeaderData>(initialHeaderData);
  const [fmeaRows, setFmeaRows] = useState<FMEARow[]>([initialRow]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // --- 추가된 부분 시작 ---
  const [isListOpen, setIsListOpen] = useState(false); // 목록 다이얼로그 열림/닫힘 상태

  // useEffect를 사용하여 앱 시작 시 최신 데이터를 자동으로 불러옵니다.
  useEffect(() => {
    const loadLatestFmea = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/get-latest-fmea');
        if (response.status === 404) return; // 저장된 데이터 없으면 종료
        if (!response.ok) throw new Error('데이터 로딩 실패');
        
        const data = await response.json();
        setHeaderData(data.headerData);
        setFmeaRows(data.rows);
      } catch (error) {
        console.error("자동 로딩 오류:", error);
      }
    };
    loadLatestFmea();
  }, []);

  // 특정 ID의 FMEA를 불러오는 함수 (FMEAListDialog에서 사용)
  const loadFmeaById = async (fmeaId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/fmea/${fmeaId}`);
      if (!response.ok) throw new Error('데이터를 불러오는 데 실패했습니다.');
      
      const data = await response.json();
      setHeaderData(data.headerData);
      setFmeaRows(data.rows);
      setMessage('불러오기 완료!');
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
       if (error instanceof Error) setMessage(`오류: ${error.message}`);
    }
  };
  // --- 추가된 부분 끝 ---

  const handleSaveFmea = async () => {
    setIsLoading(true);
    setMessage(null);

    const fmeaData = { headerData, rows: fmeaRows };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/save-fmea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fmeaData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || '저장 중 오류가 발생했습니다.');

      setMessage(`저장 완료! (FMEA ID: ${result.id})`);
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      if (error instanceof Error) setMessage(`오류: ${error.message}`);
      else setMessage('알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-[2560px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight">잠재적 고장 형태 및 영향 분석</h1>
              <p className="mt-2 text-lg text-muted-foreground">(Failure Mode and Effects Analysis)</p>
            </div>

            <FMEAHeader headerData={headerData} setHeaderData={setHeaderData} />
            
            <div className="flex justify-end items-center gap-4">
              {message && (
                <p className={`text-sm font-medium ${message.startsWith('오류') ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
                </p>
              )}
              {/* --- 불러오기 버튼 추가 --- */}
              <Button variant="outline" onClick={() => setIsListOpen(true)}>
                <FolderDown className="w-4 h-4 mr-2" />
                불러오기
              </Button>
              <Button onClick={handleSaveFmea} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? '저장 중...' : '저장'}
              </Button>
            </div>

            <FMEAForm rows={fmeaRows} setRows={setFmeaRows} />
            <FMEAGuide />
          </div>
        </div>
      </div>
      {/* --- 다이얼로그 컴포넌트 렌더링 --- */}
      <FMEAListDialog 
        open={isListOpen}
        onOpenChange={setIsListOpen}
        onLoad={loadFmeaById}
      />
    </div>
  );
}