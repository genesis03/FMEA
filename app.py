from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
# CORS 설정을 Codespaces와 로컬 환경 모두에서 작동하도록 수정
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:5173",  # 로컬 개발 환경
            "https://*.app.github.dev" # GitHub Codespaces 환경
        ]
    }
})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'fmea.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# FmeaHeader 모델 (변경 없음)
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
    rows = db.relationship('FmeaRow', backref='header', lazy=True, cascade="all, delete-orphan")

# --- 변경점: FmeaRow 모델을 프론트엔드와 일치하도록 수정 ---
class FmeaRow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.Text)
    # 'function' 속성 제거됨
    failureMode = db.Column(db.Text)
    effectsOfFailure = db.Column(db.Text)
    severity = db.Column(db.Integer)
    classification = db.Column(db.String(10)) # '분류' 추가됨
    causesOfFailure = db.Column(db.Text)
    occurrence = db.Column(db.Integer)
    currentControlsPrevention = db.Column(db.Text) # 속성 이름 변경 및 추가
    currentControlsDetection = db.Column(db.Text) # 속성 추가
    detection = db.Column(db.Integer)
    rpn = db.Column(db.Integer)
    recommendedActions = db.Column(db.Text)
    responsibility = db.Column(db.String(100))
    targetDate = db.Column(db.String(20))
    actionsTaken = db.Column(db.Text)
    completionDate = db.Column(db.String(20)) # '완료일' 추가됨
    newSeverity = db.Column(db.Integer)
    newOccurrence = db.Column(db.Integer)
    newDetection = db.Column(db.Integer)
    newRpn = db.Column(db.Integer)
    header_id = db.Column(db.Integer, db.ForeignKey('fmea_header.id'), nullable=False)

# 저장 API (변경 없음)
@app.route('/api/save-fmea', methods=['POST'])
def save_fmea():
    data = request.json
    header_data = data.get('headerData')
    rows_data = data.get('rows')

    if not header_data or not rows_data:
        return jsonify({"error": "Header 또는 Row 데이터가 없습니다."}), 400

    try:
        new_header = FmeaHeader(**header_data)

        for row_data in rows_data:
            row_data.pop('id', None)
            # 프론트엔드에서 'function' 속성을 보낼 경우를 대비해 여기서도 제거
            row_data.pop('function', None) 
            new_row = FmeaRow(**row_data)
            new_header.rows.append(new_row)

        db.session.add(new_header)
        db.session.commit()
        
        return jsonify({"message": "FMEA 데이터가 성공적으로 저장되었습니다.", "id": new_header.id}), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# 불러오기 API (변경 없음)
@app.route('/api/get-latest-fmea', methods=['GET'])
def get_latest_fmea():
    # ... (이하 코드는 이전과 동일)
    pass

# ... (기존 get_latest_fmea 함수 아래에 추가) ...

# 저장된 모든 FMEA의 목록을 반환하는 API
@app.route('/api/fmea-list', methods=['GET'])
def get_fmea_list():
    try:
        headers = FmeaHeader.query.order_by(FmeaHeader.id.desc()).all()
        fmea_list = [
            {
                "id": header.id,
                "productName": header.productName,
                "fmeaNumber": header.fmeaNumber,
                "datePrepared": header.datePrepared
            } for header in headers
        ]
        return jsonify(fmea_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 특정 ID의 FMEA 데이터를 불러오는 API
@app.route('/api/fmea/<int:fmea_id>', methods=['GET'])
def get_fmea_by_id(fmea_id):
    try:
        header = FmeaHeader.query.get(fmea_id)
        if not header:
            return jsonify({"message": "해당 ID의 FMEA를 찾을 수 없습니다."}), 404

        header_data = {c.name: getattr(header, c.name) for c in header.__table__.columns}
        header_data.pop('id', None)

        rows_data = []
        for row in header.rows:
            row_dict = {c.name: getattr(row, c.name) for c in row.__table__.columns}
            row_dict['id'] = str(row.id)
            row_dict.pop('header_id', None)
            rows_data.append(row_dict)
        
        return jsonify({
            "headerData": header_data,
            "rows": rows_data
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ... (if __name__ == '__main__': 부분은 그대로 둡니다) ...

if __name__ == '__main__':
    app.run(debug=True)