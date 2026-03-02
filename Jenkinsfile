pipeline {
    agent any

    tools {
        nodejs 'Node20'
    }

    environment {
        PATH = "${tool 'Node20'}/bin:${env.PATH}"
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

        stage('Install PM2 (Jenkins Environment)') {
            steps {
                sh '''
                    echo "Checking PM2..."
                    if ! command -v pm2 >/dev/null 2>&1; then
                        echo "Installing PM2 globally..."
                        npm install -g pm2
                    else
                        echo "PM2 already installed"
                    fi
                '''
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
