import MD5 from 'md5';
import nacl from 'tweetnacl';
import util from 'tweetnacl-util';
import pbkdf2 from 'pbkdf2';

nacl.util = util;

async function generateKeys(password, salt) {
  const derivedKey = pbkdf2.pbkdf2Sync(password, salt, 5000, 256, 'sha512');
  // noinspection JSCheckFunctionSignatures
  const hex = `0x${derivedKey.toString('hex')}`;

  const { publicKey, secretKey } = nacl.box.keyPair.fromSecretKey(
    util.decodeBase64(window.btoa(MD5(hex + salt))),
  );

  return {
    publicKey: util.encodeBase64(publicKey),
    secretKey: util.encodeBase64(secretKey),
  };
}

async function decipher(file, ownerPublicKey, secretKey) {
  console.log(file, ownerPublicKey, secretKey);
  const reader = new FileReader();
  reader.readAsDataURL(file.data);

  reader.onload = async (e) => {
    const content = e.target.result.replace('data:', '').replace(/^.+,/, '');

    const sharedKey = nacl.box.before(
      util.decodeBase64(ownerPublicKey),
      util.decodeBase64(secretKey),
    );

    const decipheredPayload = nacl.box.open.after(
      util.decodeBase64(content),
      util.decodeBase64(file.nonce),
      sharedKey,
    );

    const outputReader = new FileReader();
    outputReader.readAsText(new Blob([decipheredPayload]));

    outputReader.onload = (res) => {
      const link = document.createElement('a');

      link.href = `data:text/plain;charset=utf-8;base64,${res.target.result}`;
      link.download = file.name;
      link.click();
    };
  };
}

export {
  generateKeys,
  decipher,
};
