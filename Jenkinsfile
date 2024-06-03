pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'echo "Building on Unix"'
                    } else {
                        bat 'echo "Building on Windows"'
                    }
                }
            }
        }

        stage('Docker Build') {
            when {
                expression { !isUnix() } // Skip for Windows for now
            }
            steps {
                sh 'docker build -t myimage .'
            }
        }
    }

    post {
        always {
            script {
                if (isUnix()) {
                    sh 'nohup somecommand &'
                } else {
                    bat 'start /B somecommand'
                }
            }
        }
    }
}
pipeline {
    agent any
    environment {
        GIT_EXEC = 'C:\\Program Files\\Git\\bin\\git.exe' // Adjust this path as needed
        DOCKERHUB_CREDENTIALS = credentials('samiwin-dockerhub')
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
        stage('Build') {
            steps {
                bat 'gradlew build' // Assuming you're using Gradle for building; adjust as necessary
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    docker.build('bookingcoreback-nodeprod-1')
                }
            }
        }
        stage('Docker Login') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKERHUB_CREDENTIALS') {
                        // Login is handled automatically by withRegistry
                    }
                }
            }
        }
        stage('Docker Push') {
            steps {
                script {
                    docker.image('bookingcoreback-nodeprod-1').push('latest')
                }
            }
        }
    }
    post {
        always {
            script {
                try {
                    powershell """
                        Start-Process -NoNewWindow -FilePath 'cmd.exe' -ArgumentList '/c some-command' -PassThru
                    """ // Replace `some-command` with your actual command
                } catch (Exception e) {
                    echo "Error running background command: ${e.getMessage()}"
                }
            }
        }
    }
}
