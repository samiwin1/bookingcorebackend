pipeline {
    environment {
        imagename = "bookingcoreback-nodeprod-1"
        registryCredential = 'samiwin-dockerhub'
        dockerImage = ''
    }
    agent any
    stages {
        stage('Cloning Git') {
            steps {
                git([url: 'https://github.com/samiwin1/bookingcorebackend.git', branch: 'main', credentialsId: 'samiwin-github-user-token'])
            }
        }
        stage('Building image') {
            steps {
                script {
                    dockerImage = docker.build(imagename)
                }
            }
        }
        stage('Deploy Image') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push("${env.BUILD_NUMBER}")
                        dockerImage.push('latest')
                    }
                }
            }
        }
        stage('Remove Unused docker image') {
            steps {
                script {
                    sh "docker rmi ${imagename}:${env.BUILD_NUMBER}"
                    sh "docker rmi ${imagename}:latest"
                }
            }
        }
    }
}
