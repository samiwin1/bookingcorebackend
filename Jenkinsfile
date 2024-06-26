pipeline {
    agent { label 'node' }

    environment {
        GIT_EXEC = 'C:\\Program Files\\Git\\bin\\git.exe' // Adjust this path as needed
        DOCKERHUB_CREDENTIALS = credentials('bookingcore')
        KUBECONFIG_PATH = 'C:\\Users\\samib\\.kube\\config' // Correct kubeconfig path
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
                    bat 'docker build -t samiwin/booking-app:1.4 . '
                }
            }
        }
        stage('Docker Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB_CREDENTIALS') {
                        bat 'docker push samiwin/booking-app:1.4'
                    }
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
