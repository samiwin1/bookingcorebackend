pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('samiwin-dockerhub') // Jenkins credentials ID for Docker Hub
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code from the repository
                checkout scm
            }
        }

        stage('Clean Project') {
            steps {
                script {
                    // Clean previous build artifacts
                    sh 'npm run clean'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build the Docker images using docker-compose
                    sh 'docker-compose -f ./docker-compose.yml build'
                }
            }
        }

        stage('Push Docker Images to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'samiwin-dockerhub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh "echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin"
                    }

                    // Push the Docker images to Docker Hub
                    sh 'docker-compose -f ./docker-compose.yml push'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Deploy the application to Kubernetes
                    sh 'kubectl apply -f kubernetes/deployment.yaml'
                }
            }
        }

        stage('Expose Service') {
            steps {
                script {
                    // Expose the Kubernetes deployment as a service
                    sh 'kubectl expose deployment bookingcorebackend --type=NodePort --port=5000'
                }
            }
        }

        stage('Apply Kubernetes Service') {
            steps {
                script {
                    // Apply the Kubernetes service configuration
                    sh 'kubectl apply -f kubernetes/service.yaml'
                }
            }
        }
    }

    post {
        always {
            script {
                // Cleanup Docker Compose containers
                sh 'docker-compose -f ./docker-compose.yml down'
            }
        }
    }
}
