import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

export function FMEAGuide() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>FMEA 작성 가이드</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="severity" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="severity">심각도</TabsTrigger>
            <TabsTrigger value="occurrence">발생도</TabsTrigger>
            <TabsTrigger value="detection">검출도</TabsTrigger>
            <TabsTrigger value="rpn">RPN</TabsTrigger>
          </TabsList>
          
          <TabsContent value="severity" className="space-y-3">
            <h3 className="font-semibold">심각도 (Severity) 평가 기준</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Badge variant="destructive" className="mb-2">위험 (9-10)</Badge>
                <p className="text-sm">안전성에 영향을 주거나 규정 위반</p>
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">높음 (7-8)</Badge>
                <p className="text-sm">고객 불만족, 기능 완전 상실</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">보통 (4-6)</Badge>
                <p className="text-sm">성능 저하, 고객 인지 가능</p>
              </div>
              <div>
                <Badge variant="default" className="mb-2">낮음 (1-3)</Badge>
                <p className="text-sm">경미한 영향, 고객이 거의 인지하지 못함</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="occurrence" className="space-y-3">
            <h3 className="font-semibold">발생도 (Occurrence) 평가 기준</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Badge variant="destructive" className="mb-2">매우 높음 (9-10)</Badge>
                <p className="text-sm">1/20 ~ 1/2 (거의 확실)</p>
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">높음 (7-8)</Badge>
                <p className="text-sm">1/80 ~ 1/20 (높은 확률)</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">보통 (4-6)</Badge>
                <p className="text-sm">1/400 ~ 1/80 (보통 확률)</p>
              </div>
              <div>
                <Badge variant="default" className="mb-2">낮음 (1-3)</Badge>
                <p className="text-sm">1/1,500,000 ~ 1/400 (낮은 확률)</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="detection" className="space-y-3">
            <h3 className="font-semibold">검출도 (Detection) 평가 기준</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Badge variant="destructive" className="mb-2">검출 불가 (9-10)</Badge>
                <p className="text-sm">검출 방법이 없거나 매우 어려움</p>
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">검출 어려움 (7-8)</Badge>
                <p className="text-sm">낮은 검출 확률</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">보통 검출 (4-6)</Badge>
                <p className="text-sm">중간 정도의 검출 확률</p>
              </div>
              <div>
                <Badge variant="default" className="mb-2">높은 검출 (1-3)</Badge>
                <p className="text-sm">높은 검출 확률, 자동 검출</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rpn" className="space-y-3">
            <h3 className="font-semibold">RPN (Risk Priority Number) 해석</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="destructive">RPN ≥ 200</Badge>
                <span className="text-sm">즉시 조치 필요 (우선순위 높음)</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">100 ≤ RPN &lt; 200</Badge>
                <span className="text-sm">단기 조치 필요 (우선순위 중간)</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">50 ≤ RPN &lt; 100</Badge>
                <span className="text-sm">장기 조치 고려 (우선순위 낮음)</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="default">RPN &lt; 50</Badge>
                <span className="text-sm">모니터링 (조치 불필요)</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>RPN 계산식:</strong> 심각도 × 발생도 × 검출도<br/>
                <strong>범위:</strong> 1 ~ 1,000<br/>
                <strong>목적:</strong> 위험의 우선순위를 정량적으로 평가
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}