'use strict';

var app = angular.module('starter', ['ngResource', 'ngRoute']);

// app.config(function($routeProvider) {
//   $routeProvider
//     .when("/", {
//       templateUrl: "src/main.html",
//       controller: 'AppController'
//     })
// });

app.controller('AppController', function($scope, $resource) {

  var Project = $resource('/api/projects/:project_id', {
      project_id: '@id'
    },
    // PUT is not a bulid-in http method in ngResource
    {
      update: {
        method: 'PUT'
      }
    }
  )
  // need to declare in first use in side controller
  // unless we cannot access editProject via $scope
  $scope.editProject = {};
  $scope.result = {};
  $scope.projects = Project.query()
  $scope.get = function(id) {
    // bear in function argument = result of Project.get().
    // bear = Project.get({project_id})
    Project.get({
      project_id: id
    }, function(project) {
      $scope.result = project
      console.log(project)
      console.log('result message = ' + project.message)
    })
  }
  $scope.edit = function(id) {
    Project.get({
      project_id: id
    }, function(project) {
      $scope.editProject.id = id
      $scope.editProject.message = project.message
      $scope.editProject.like = project.like
      $scope.editProject.share = project.share
      $scope.result = 'Edit project ' + id
      console.log('result message = ' +   $scope.result)
      $scope.get(id)
    })
  }
  $scope.update = function(id) {
    if ($scope.editProject.message != '') {
      Project.update({
        project_id: id
      }, {
        message: $scope.editProject.message,
        like: $scope.editProject.like,
        share: $scope.editProject.share
      });
      $scope.result = 'Project ' + id + ' is updated'
      console.log('result message = ' +   $scope.result)
      $scope.projects = Project.query();
      $scope.get(id)
    } else {
      $scope.result = 'Please enter updating bear by Select Edit button'
    }
  }
  $scope.delete = function(id) {
    Project.delete({
      project_id: id
    })
    $scope.result = 'Project ' + id + ' is deleted'
    console.log('result message = ' +   $scope.result)
    $scope.projects = Project.query();
  }
  $scope.add = function() {
    Project.save({
      message: $scope.addProject.message,
      like: $scope.addProject.like,
      share: $scope.addProject.share
    })
    $scope.result = 'Project ' + id + ' is created'
    console.log('result message = ' +   $scope.result)
    $scope.projects = Project.query();
  };

  // ======= function for front-end display with Angular ====
  $scope.isEmpty = function(obj) {
    return Object.keys(obj).length == 0;
  }
  $scope.select = function(id, obj) {
    return id == obj.id
  }


});
