import React from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export interface FMEAHeaderData {
  company: string;
  productName: string;
  productNumber: string;
  modelYear: string;
  team: string;
  preparedBy: string;
  datePrepared: string;
  approvedBy: string;
  dateApproved: string;
  revision: string;
  page: string;
  // fmeaType: 'DFMEA' | 'PFMEA';
  fmeaNumber: string;
}

export interface FMEAHeaderProps {
  headerData: FMEAHeaderData;
  setHeaderData: React.Dispatch<React.SetStateAction<FMEAHeaderData>>;
}

export function FMEAHeader({ headerData, setHeaderData }: FMEAHeaderProps) {
  
  const updateField = (field: keyof FMEAHeaderData, value: string) => {
    setHeaderData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* 요청하신 3단 그리드 구조로 변경 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
          
          {/* 컬럼 1 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="company" className="text-sm font-medium">회사명 (Company)</Label>
              <Input id="company" value={headerData.company} onChange={(e) => updateField('company', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="productName" className="text-sm font-medium">제품/부품명 (Product/Part Name)</Label>
              <Input id="productName" value={headerData.productName} onChange={(e) => updateField('productName', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="productNumber" className="text-sm font-medium">제품/부품번호 (Product/Part Number)</Label>
              <Input id="productNumber" value={headerData.productNumber} onChange={(e) => updateField('productNumber', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="modelYear" className="text-sm font-medium">모델연도 (Model Year)</Label>
              <Input id="modelYear" value={headerData.modelYear} onChange={(e) => updateField('modelYear', e.target.value)} />
            </div>
          </div>

          {/* 컬럼 2 */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="team" className="text-sm font-medium">부서 (Team)</Label>
                <Input id="team" value={headerData.team} onChange={(e) => updateField('team', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="preparedBy" className="text-sm font-medium">작성자 (Prepared By)</Label>
                <Input id="preparedBy" value={headerData.preparedBy} onChange={(e) => updateField('preparedBy', e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="datePrepared" className="text-sm font-medium">작성일 (Date Prepared)</Label>
              <Input id="datePrepared" type="date" value={headerData.datePrepared} onChange={(e) => updateField('datePrepared', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="approvedBy" className="text-sm font-medium">승인자 (Approved By)</Label>
              <Input id="approvedBy" value={headerData.approvedBy} onChange={(e) => updateField('approvedBy', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="dateApproved" className="text-sm font-medium">승인일 (Date Approved)</Label>
              <Input id="dateApproved" type="date" value={headerData.dateApproved} onChange={(e) => updateField('dateApproved', e.target.value)} />
            </div>
          </div>

          {/* 컬럼 3 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="fmeaNumber" className="text-sm font-medium">FMEA 번호 (FMEA Number)</Label>
              <Input id="fmeaNumber" value={headerData.fmeaNumber} onChange={(e) => updateField('fmeaNumber', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="revision" className="text-sm font-medium">개정번호 (Revision)</Label>
              <Input id="revision" value={headerData.revision} onChange={(e) => updateField('revision', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="page" className="text-sm font-medium">페이지 (Page)</Label>
              <Input id="page" value={headerData.page} onChange={(e) => updateField('page', e.target.value)} />
            </div>
            {/* 이 칸은 비워둬서 4번째 줄의 정렬을 맞춥니다. */}
            <div></div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}