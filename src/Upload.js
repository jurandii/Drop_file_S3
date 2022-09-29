import React, { useState } from 'react';
import S3 from 'react-aws-s3';
import { uniqueId } from 'lodash';

// Resolve erro do buffer
window.Buffer = window.Buffer || require("buffer").Buffer;


const Upload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState(null);

    // Configs
    const config = {
        bucketName: 'your-bucket',
        region: 'sa-east-1',
        dirName: 'test',
        accessKeyId: 'your-access',
        secretAccessKey: 'your-secret',
    }

    const handleFileInput = (e) => {
        const ext = e.target.files[0].name.split('.').pop();
        const newFileName = uniqueId() + '.' + ext;
        setFileName(newFileName);
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = async (file) => {
        const ReactS3Client = new S3(config);
        //Nome do arquivo
        ReactS3Client
            .uploadFile(file, fileName)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    const removeFile = async (file) => {
        const ReactS3Client = new S3(config);
        //Nome do arquivo
        ReactS3Client
            .deleteFile(fileName)
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return <div>
        <div>Upload to S3</div>
        <input type="file" onChange={handleFileInput} />
        <br></br>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
        <button onClick={() => removeFile(selectedFile)}> Delete from S3</button>
    </div>
}

export default Upload;