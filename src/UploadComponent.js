import React, { useState } from "react";
import axios from "axios";
import {
    Button,
    TextField,
    LinearProgress,
    Typography,
    Container,
} from '@mui/material';

function UploadComponent() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Select File!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                },
            });

            alert('Uploaded File!');
            console.log('Response from Server: ', response.data);
        } catch (error) {
            console.error('Failed Uploading: ', error);
            alert('Failed Upload');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                ドキュメントのアップロード
            </Typography>
            <input
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                    ファイルを選択
                </Button>
                {selectedFile && (
                    <Typography variant="body1">{selectedFile.name}</Typography>
                )}
            </label>
            <br />
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!selectedFile}
            >
                アップロード
            </Button>
            {uploadProgress > 0 && (
                <div>
                    <br />
                    <LinearProgress variant="determinate" value={uploadProgress} />
                    <Typography variant="body2" color="textSecondary">
                        アップロード進行状況: {uploadProgress}%
                    </Typography>
                </div>
            )}
        </Container>
    );
}

export default UploadComponent;