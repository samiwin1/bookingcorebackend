pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('DOCKERHUB_CREDENTIALS')
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git credentialsId: '57f4e9dd-f030-4250-8e0d-8deb370b222b', url: 'https://github.com/samiwin1/bookingcorebackend.git'
            }
        }

        stage('Clean Project') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'echo Cleaning project...'
                    } else {
                        bat 'echo Cleaning project...'
                    }
                }
            }
        }

        stage('Build Docker Images') {
            when {
                expression { currentBuild.result == null }
            }
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t your_image_name .'
                    } else {
                        bat 'docker build -t your_image_name .'
                    }
                }
            }
        }

        stage('Push Docker Images to Docker Hub') {
            when {
                expression { currentBuild.result == null }
            }
            steps {
                script {
                    if (isUnix()) {
                        sh """
                        docker login -u ${DOCKERHUB_CREDENTIALS_USR} -p ${DOCKERHUB_CREDENTIALS_PSW}
                        docker push your_image_name
                        """
                    } else {
                        bat """
                        docker login -u %DOCKERHUB_CREDENTIALS_USR% -p %DOCKERHUB_CREDENTIALS_PSW%
                        docker push your_image_name
                        """
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            when {
                expression { currentBuild.result == null }
            }
            steps {
                script {
                    if (isUnix()) {
                        sh 'kubectl apply -f your_k8s_config_file.yaml'
                    } else {
                        bat 'kubectl apply -f your_k8s_config_file.yaml'
                    }
                }
            }
        }

        stage('Expose Service') {
            when {
                expression { currentBuild.result == null }
            }
            steps {
                script {
                    if (isUnix()) {
                        sh 'kubectl expose deployment your_deployment --type=LoadBalancer --name=your-service'
                    } else {
                        bat 'kubectl expose deployment your_deployment --type=LoadBalancer --name=your-service'
                    }
                }
            }
        }

        stage('Apply Kubernetes Service') {
            when {
                expression { currentBuild.result == null }
            }
            steps {
                script {
                    if (isUnix()) {
                        sh 'kubectl apply -f your_service_file.yaml'
                    } else {
                        bat 'kubectl apply -f your_service_file.yaml'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (isUnix()) {
                    sh 'echo Pipeline finished'
                } else {
                    bat 'echo Pipeline finished'
                }
            }
        }

        failure {
            script {
                if (isUnix()) {
                    sh 'echo Pipeline failed'
                } else {
                    bat 'echo Pipeline failed'
                }
            }
        }
    }
}
