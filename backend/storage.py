import json
from cryptography.fernet import Fernet

class Storage:
    def __init__(self, filepath, key):
        self.filepath = filepath
        self.key = key.encode()  # Convert key to bytes
        self.cipher = Fernet(Fernet.generate_key())

    def load(self):
        try:
            with open(self.filepath, 'rb') as file:
                encrypted_data = file.read()
            decrypted_data = self.cipher.decrypt(encrypted_data)
            return json.loads(decrypted_data.decode('utf-8'))
        except FileNotFoundError:
            return []

    def save(self, data):
        encrypted_data = self.cipher.encrypt(json.dumps(data).encode('utf-8'))
        with open(self.filepath, 'wb') as file:
            file.write(encrypted_data)
