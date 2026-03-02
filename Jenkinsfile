pipeline {
    agent any

    tools {
        nodejs 'Node20'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Kheav-Kienghok/DevOp-Assignment-2.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy API using PM2') {
            steps {
                sh '''
                    echo "Stopping old API..."
                    pm2 delete index || true

                    echo "Starting new API..."
                    pm2 start index.js --name index

                    pm2 save
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 5
                    curl -f http://localhost:3000/ || exit 1
                    echo "API deployed successfully"
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment SUCCESS ✅'
        }
        failure {
            echo 'Deployment FAILED ❌'
        }
        always {
            echo 'Pipeline finished.'
        }
    }
}
