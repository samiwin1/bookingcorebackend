pipeline {
    agent { label 'node' }

    environment {
        GIT_EXEC = 'C:\\Program Files\\Git\\bin\\git.exe'
        DOCKERHUB_CREDENTIALS = credentials('bookingcore')
        KUBECONFIG_CREDENTIALS = credentials('my_kubernetes')
    }

    stages {
        stage('Checkout SCM') {
            steps {
                script {
                    if (!fileExists(env.GIT_EXEC)) {
                        error "Git executable not found at ${env.GIT_EXEC}"
                    }
                }
                git branch: 'main', url: 'https://github.com/samiwin1/bookingcorebackend.git'
            }
        }
        stage('Build with Docker Compose') {
            steps {
                script {
                    bat 'docker-compose -f .\\docker-compose.yml up --build -d'
                }
            }
        }
        stage('Docker Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB_CREDENTIALS') {
                        bat 'docker push samiwin/booking-app:1.2'
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Run the pod
                    bat 'kubectl run pfebookingdeploy --image=samiwin/booking-app:1.2 --port=3000'
                    
                    // Expose the pod
                    bat 'kubectl expose pod pfebookingdeploy --name=samiwinsvc --port=3000'
                }
            }
        }
    }

    post {
        always {
            script {
                try {
                    // Additional cleanup or notifications can go here
                } catch (Exception e) {
                    echo "Error during post-build steps: ${e.getMessage()}"
                }
            }
        }
    }
}
