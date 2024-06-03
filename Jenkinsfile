pipeline {
    agent any

    environment {
        // Define environment variables for Docker Hub credentials
        DOCKERHUB_CREDENTIALS = credentials('samiwin-dockerhub')
        IMAGE_NAME = "bookingcoreback-nodeprod-1"
        DOCKER_HUB_REPO = "samiwin/booking-app:1.2"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git url: 'https://github.com/samiwin1/bookingcorebackend.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                // Install dependencies and build the NestJS project
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                // Build the Docker image
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Docker Login') {
            steps {
                // Log in to Docker Hub
                sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
            }
        }

        stage('Docker Push') {
            steps {
                // Tag the Docker image
                sh "docker tag ${IMAGE_NAME} ${DOCKER_HUB_REPO}"

                // Push the Docker image to Docker Hub
                sh "docker push ${DOCKER_HUB_REPO}"
            }
        }
    }

    post {
        always {
            // Clean up the Docker environment
            sh 'docker logout'
        }
    }
}
