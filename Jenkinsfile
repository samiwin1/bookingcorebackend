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

        stage('Build with Docker Compose') {
            steps {
                script {
                    // Use Docker Compose to build and run the application
                    bat 'docker-compose -f ./docker-compose.yml up --build -d'
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub using credentials stored in Jenkins
                    bat "echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin"

                    // Push your production Docker image to Docker Hub
                    bat 'docker push samiwin/booking-app:1.2'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Deploy the application to Kubernetes
                    bat 'kubectl run pfebookingdeploy --image=samiwin/booking-app:1.2 --port=3000'
                    bat 'kubectl run pfebookingproject --image=samiwin/booking-app:1.2 --port=3000'
                }
            }
        }

        stage('Expose Service') {
            steps {
                script {
                    // Expose the Kubernetes deployment as a service
                    bat 'kubectl expose pod pfebookingdeploy --name=samiwinsvc --port=3000'
                }
            }
        }

        stage('Send to Minikube') {
            steps {
                script {
                    // Ensure the commands are run in Minikube context
                    bat 'kubectl --context=minikube run pfebookingdeploy --image=samiwin/booking-app:1.2 --port=3000'
                    bat 'kubectl --context=minikube run pfebookingproject --image=samiwin/booking-app:1.2 --port=3000'
                    bat 'kubectl --context=minikube expose pod pfebookingdeploy --name=samiwinsvc --port=3000'
                }
            }
        }
    }

    post {
        always {
            script {
                // Cleanup Docker Compose containers
                bat 'docker-compose -f ./docker-compose.yml down'
            }
        }
    }
}
