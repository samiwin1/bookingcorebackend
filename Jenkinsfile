
pipeline {
    environment {
        imagename = "bookingcoreback-nodeprod-1"
        dockerImage = ''
    } 
    agent any
    stages {
        stage('Cloning Git') {
            steps {
                checkout scm
            }
        }
        stage('Building image') {
            steps {
                script {
                    dockerImage = docker.build imagename
                }
            }
        }
        stage('Deploy Master Image') {
            when {
                branch 'master'
            }
            steps {
                script {
                    docker.withRegistry(ecrurl, ecrcredentials) {     
                        dockerImage.push("${ecrurl}/${imagename}:${BUILD_NUMBER}")
                        dockerImage.push("${ecrurl}/${imagename}:latest")
                    }
                }
            }
        }
    }  
}
