from flask import Flask, request, jsonify
from storage import Storage

app = Flask(__name__)
storage = Storage('data.json', 'mysecretkey')

@app.route('/api/diagrams', methods=['GET', 'POST'])
def diagrams():
    if request.method == 'GET':
        return jsonify(storage.load())
    if request.method == 'POST':
        data = request.json
        storage.save(data)
        return jsonify(data), 201

if __name__ == '__main__':
    app.run(debug=True)
