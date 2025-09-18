import { useState } from 'react';
import { FMEAHeader, FMEAHeaderData } from './components/FMEAHeader';
import { FMEAForm, FMEARow } from './components/FMEAForm';
import { FMEAGuide } from './components/FMEAGuide';
import { Button } from './components/ui/button';
import { Save } from 'lucide-react';

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
    item: '',
    function: '',
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

  const handleSaveFmea = async () => {
    setIsLoading(true);
    setMessage(null);

    const fmeaData = {
      headerData,
      rows: fmeaRows,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/save-fmea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fmeaData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '저장 중 오류가 발생했습니다.');
      }

      setMessage(`저장 완료! (FMEA ID: ${result.id})`);
      setTimeout(() => setMessage(null), 3000);

    } catch (error) {
      if (error instanceof Error) {
        setMessage(`오류: ${error.message}`);
      } else {
        setMessage('알 수 없는 오류가 발생했습니다.');
      }
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
              <p className="mt-2 text-lg text-muted-foreground">
                (Failure Mode and Effects Analysis)
              </p>
            </div>

            <FMEAHeader headerData={headerData} setHeaderData={setHeaderData} />
            
            {/* --- 변경점: 저장 버튼을 FMEAHeader와 FMEAForm 사이에 배치 --- */}
            <div className="flex justify-end items-center gap-4">
              {message && (
                <p className={`text-sm font-medium ${message.startsWith('오류') ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
                </p>
              )}
              <Button onClick={handleSaveFmea} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? '저장 중...' : '저장'}
              </Button>
            </div>

            <FMEAForm 
              rows={fmeaRows} 
              setRows={setFmeaRows}
            />

            <FMEAGuide />
          </div>
        </div>
      </div>
    </div>
  );
}