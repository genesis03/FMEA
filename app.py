from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy # SQLAlchemy import
import os

# 현재 파일의 절대 경로를 기준으로 데이터베이스 파일 경로 설정
basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# 데이터베이스 설정
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'fmea.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 데이터베이스 객체 생성
db = SQLAlchemy(app)

# ... (이전 app.py 코드 아래에 이어서 작성) ...

# FMEA Header 데이터를 위한 테이블 모델
class FmeaHeader(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(100))
    productName = db.Column(db.String(200))
    productNumber = db.Column(db.String(100))
    modelYear = db.Column(db.String(20))
    team = db.Column(db.String(100))
    preparedBy = db.Column(db.String(100))
    datePrepared = db.Column(db.String(20))
    approvedBy = db.Column(db.String(100))
    dateApproved = db.Column(db.String(20))
    revision = db.Column(db.String(20))
    page = db.Column(db.String(20))
    fmeaType = db.Column(db.String(20))
    fmeaNumber = db.Column(db.String(100))
    
    # FmeaRow 모델과의 관계 설정 (하나의 헤더는 여러 개의 행을 가짐)
    rows = db.relationship('FmeaRow', backref='header', lazy=True, cascade="all, delete-orphan")

# FMEA Row 데이터를 위한 테이블 모델
class FmeaRow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.Text)
    failureMode = db.Column(db.Text)
    effectsOfFailure = db.Column(db.Text)
    severity = db.Column(db.Integer)
    classification = db.Column(db.String(10))
    causesOfFailure = db.Column(db.Text)
    occurrence = db.Column(db.Integer)
    currentControlsPrevention = db.Column(db.Text)
    currentControlsDetection = db.Column(db.Text)
    detection = db.Column(db.Integer)
    rpn = db.Column(db.Integer)
    recommendedActions = db.Column(db.Text)
    responsibility = db.Column(db.String(100))
    targetDate = db.Column(db.String(20))
    actionsTaken = db.Column(db.Text)
    completionDate = db.Column(db.String(20))
    newSeverity = db.Column(db.Integer)
    newOccurrence = db.Column(db.Integer)
    newDetection = db.Column(db.Integer)
    newRpn = db.Column(db.Integer)

    # FmeaHeader 모델과의 관계 설정 (어떤 헤더에 속하는지 명시)
    header_id = db.Column(db.Integer, db.ForeignKey('fmea_header.id'), nullable=False)

    # ... (FmeaRow 모델 정의 아래에 이어서 작성) ...

# RPN 계산 API는 이제 사용하지 않으므로 주석 처리하거나 삭제합니다.
# @app.route('/api/calculate-fmea', methods=['POST'])
# def calculate_fmea():
#     ...

# 새로운 저장 API
@app.route('/api/save-fmea', methods=['POST'])
def save_fmea():
    data = request.json
    header_data = data.get('headerData')
    rows_data = data.get('rows')

    if not header_data or not rows_data:
        return jsonify({"error": "Header 또는 Row 데이터가 없습니다."}), 400

    try:
        # 1. 헤더 데이터로 FmeaHeader 객체 생성
        new_header = FmeaHeader(**header_data)

        # 2. 각 행 데이터로 FmeaRow 객체를 생성하고 헤더에 연결
        for row_data in rows_data:
            # 프론트엔드에서 보내는 id는 문자열이므로 데이터베이스 모델에 맞지 않아 제외
            row_data.pop('id', None) 
            new_row = FmeaRow(**row_data)
            new_header.rows.append(new_row)

        # 3. 데이터베이스 세션에 추가하고 커밋(저장)
        db.session.add(new_header)
        db.session.commit()
        
        return jsonify({"message": "FMEA 데이터가 성공적으로 저장되었습니다.", "id": new_header.id}), 201
        
    except Exception as e:
        db.session.rollback() # 오류 발생 시 롤백
        return jsonify({"error": str(e)}), 500

# ... (기존 save_fmea 함수 아래에 추가) ...

# 가장 최근에 저장된 FMEA 데이터를 불러오는 API
@app.route('/api/get-latest-fmea', methods=['GET'])
def get_latest_fmea():
    try:
        # FmeaHeader 테이블에서 id를 기준으로 내림차순 정렬 후 가장 첫 번째(최신) 데이터를 가져옴
        latest_header = FmeaHeader.query.order_by(FmeaHeader.id.desc()).first()

        if not latest_header:
            return jsonify({"message": "저장된 FMEA 데이터가 없습니다."}), 404

        # 헤더 데이터를 딕셔너리로 변환
        header_data = {c.name: getattr(latest_header, c.name) for c in latest_header.__table__.columns}
        header_data.pop('id', None) # 불필요한 id는 제거

        # 헤더에 연결된 행(row) 데이터를 딕셔너리 리스트로 변환
        rows_data = []
        for row in latest_header.rows:
            row_dict = {c.name: getattr(row, c.name) for c in row.__table__.columns}
            row_dict['id'] = str(row.id) # 프론트엔드에서 사용할 id는 문자열로 변환
            row_dict.pop('header_id', None) # 불필요한 외래 키는 제거
            rows_data.append(row_dict)
        
        # 최종적으로 헤더와 행 데이터를 합쳐서 JSON으로 반환
        return jsonify({
            "headerData": header_data,
            "rows": rows_data
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ... (if __name__ == '__main__': 부분은 그대로 둡니다) ...

if __name__ == '__main__':
    app.run(debug=True)