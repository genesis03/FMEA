import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface FMEAHeaderData {
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
}

export function FMEAHeader() {
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
  });

  const updateField = (field: keyof FMEAHeaderData, value: string) => {
    setHeaderData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 첫 번째 컬럼 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="company">회사명 (Company)</Label>
              <Input
                id="company"
                value={headerData.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder="회사명을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="productName">제품/부품명 (Product/Part Name)</Label>
              <Input
                id="productName"
                value={headerData.productName}
                onChange={(e) => updateField('productName', e.target.value)}
                placeholder="제품 또는 부품명을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="productNumber">제품/부품번호 (Product/Part Number)</Label>
              <Input
                id="productNumber"
                value={headerData.productNumber}
                onChange={(e) => updateField('productNumber', e.target.value)}
                placeholder="제품 또는 부품번호를 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="modelYear">모델연도 (Model Year)</Label>
              <Input
                id="modelYear"
                value={headerData.modelYear}
                onChange={(e) => updateField('modelYear', e.target.value)}
                placeholder="2024"
              />
            </div>
          </div>

          {/* 두 번째 컬럼 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="team">팀 (Team)</Label>
              <Input
                id="team"
                value={headerData.team}
                onChange={(e) => updateField('team', e.target.value)}
                placeholder="담당 팀명을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="preparedBy">준비자 (Prepared By)</Label>
              <Input
                id="preparedBy"
                value={headerData.preparedBy}
                onChange={(e) => updateField('preparedBy', e.target.value)}
                placeholder="작성자명을 입력하세요"
              />
            </div>
            <div>
              <Label htmlFor="datePrepared">준비일 (Date Prepared)</Label>
              <Input
                id="datePrepared"
                type="date"
                value={headerData.datePrepared}
                onChange={(e) => updateField('datePrepared', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="approvedBy">승인자 (Approved By)</Label>
              <Input
                id="approvedBy"
                value={headerData.approvedBy}
                onChange={(e) => updateField('approvedBy', e.target.value)}
                placeholder="승인자명을 입력하세요"
              />
            </div>
          </div>

          {/* 세 번째 컬럼 */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="dateApproved">승인일 (Date Approved)</Label>
              <Input
                id="dateApproved"
                type="date"
                value={headerData.dateApproved}
                onChange={(e) => updateField('dateApproved', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="revision">개정번호 (Revision)</Label>
              <Input
                id="revision"
                value={headerData.revision}
                onChange={(e) => updateField('revision', e.target.value)}
                placeholder="1.0"
              />
            </div>
            <div>
              <Label htmlFor="page">페이지 (Page)</Label>
              <Input
                id="page"
                value={headerData.page}
                onChange={(e) => updateField('page', e.target.value)}
                placeholder="1 of 1"
              />
            </div>
            <div className="pt-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">FMEA 유형</p>
                <p className="text-sm text-muted-foreground">Design FMEA (DFMEA)</p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 구분선과 제목 */}
        <div className="mt-6 pt-4 border-t">
          <div className="text-center space-y-1">
            <h2 className="text-lg font-semibold">고장모드 및 영향분석</h2>
            <p className="text-sm text-muted-foreground">(Failure Mode and Effects Analysis)</p>
            <p className="text-xs text-muted-foreground">AIAG-VDA FMEA Handbook 준수</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}