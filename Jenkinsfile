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

        stage('Build and Push to Docker Hub') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker-compose -f ./docker-compose.yml build'

                    // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'samiwin-dockerhub', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                    }

                    // Push the Docker image to Docker Hub
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

        stage('Send to Minikube') {
            steps {
                script {
                    // Send the application to Minikube
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
