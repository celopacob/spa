<template>
  <div class="repo-list">
    <h1 class="my-4">GitHub
      <small>Most Popular Repos</small>
    </h1>
    <div class="row" style="margin-top:20px;padding-bottom:20px;border-bottom:1px solid #d9dadb"
        v-for="repo in repos">
      <div class="col-md-3">
        <a href="#">
          <img height="180" width="180" class="img-fluid rounded mb-3 mb-md-0" :src="repo.owner.avatar_url">
        </a>
      </div>
      <div class="col-md-9">
        <h3>Repo <small>{{repo.name}}</small></h3>
        <h4>Owner <small>{{repo.owner.login}}</small></h4>
        <p><span>Stars: {{repo.stargazers_count}}</span>&nbsp;<span>Forks: {{repo.forks_count}}</span></p>
        <p>{{repo.description}}</p>


        <router-link
            class="btn btn-primary"
            :to="{ name: 'pullRequests', params: { login: repo.owner.login, repo: repo.name }}"
            >View Pull Requests</router-link>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'RepoList',
      data: function() {
        return {
          repos: [],
          url: 'https://api.github.com/search/repositories?q=all&sort=stars&order=desc&per_page=10',
          page: 1
        }
      },
      beforeMount() {
        this.getInitialRepos();
      },
      methods: {
        getInitialRepos(){
          var vm = this;
          fetch(this.url+'&page='+this.page).then(function (response) {
            return response.json();
          }).then(function (data) {
            vm.repos = data.items;
          });
        },
        scroll (repos) {
          window.onscroll = () => {
            let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

            if (bottomOfWindow) {
              this.page = this.page+1;
              var vm = this;

              fetch(this.url+'&page='+this.page).then(function (response) {
                return response.json();
              }).then(function (data) {
                  $.each(data.items, function(key, item){
                    vm.repos.push(item);
                  });
              });
            }
          };
        }
      },
      mounted() {
        this.scroll(this.repos);
      }
    }
</script>
