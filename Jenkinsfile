pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'satyamkant/blog-frontend:latest'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                // Pull the latest code from the new GitHub repo
                git url: 'https://github.com/satyamkant/satyampi-frontend.git', branch: 'main'
            }
        }

        stage('Build React Application') {
            steps {
                echo 'Building React application...'
                // Run npm install and build directly in the root directory
                script {
                    sh 'npm install'  // Install dependencies
                    sh 'npm run build'  // Build the React application
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                // Build the Docker image from the Dockerfile in the root directory
                script {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                echo 'Deploying Docker container...'
                // Stop any running container with the same name and start the new one
                script {
                    sh '''
                    docker stop blog-frontend || true
                    docker rm blog-frontend || true
                    docker run -d --name blog-frontend --network ProjectPi --restart always -p 81:80 $DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker image prune -f'
                sh 'docker builder prune --all -f'
                sh 'docker system prune -f --volumes'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()  // Clean the workspace after the pipeline run
        }
        success {
            echo 'Deployment successful.'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}