<template>
  <div class="pr-list">
    <h1 class="my-4">GitHub
      <small>Pull Requests for {{$route.params.repo}}</small>
    </h1>
    <div class="row" style="margin-top:20px;padding-bottom:20px;border-bottom:1px solid #d9dadb"
      v-for="pullRequest in pullRequests">
      <div class="col-md-3">
        <a href="#">
          <img height="180" width="180" class="img-fluid rounded mb-3 mb-md-0" :src="pullRequest.user.avatar_url">
        </a>
      </div>
      <div class="col-md-9">
        <h3>Author <small>{{pullRequest.user.login}}</small></h3>
        <h4>Title <small>{{pullRequest.title}}</small></h4>
        <h4>Date <small>{{ pullRequest.created_at | moment("DD/MM/YYYY") }}</small></h4>
        <p>{{pullRequest.body}}</p>
        <a :href="pullRequest.html_url" target="_blank" class="btn btn-primary">View Pull Request</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PullRequests',
    data: function() {
      return {
        pullRequests: [],
        page: 1,
        login: this.$route.params.login,
        repo: this.$route.params.repo
      }
    },
    beforeMount() {
      this.getPullRequests();
    },
    methods: {
      getPullRequests() {
        var vm = this;
        fetch('https://api.github.com/repos/'+this.login+'/'+this.repo+'/pulls?page=1&per_page=10')
        .then(function (response) {
          return response.json();
        }).then(function (data) {
          vm.pullRequests = data;
        });
      },
      scroll (pullRequests) {
        window.onscroll = () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight
          === document.documentElement.offsetHeight;

          if (bottomOfWindow) {
            this.page = this.page+1;
            var vm = this;

            fetch('https://api.github.com/repos/'+this.login+'/'+this.repo+'/pulls?per_page=10&page='+this.page)
            .then(function (response) {
              return response.json();
            }).then(function (data) {
                $.each(data, function(key, item){
                  vm.pullRequests.push(item);
                });
            });
          }
        };
      }
    },
    mounted() {
      this.scroll(this.pullRequests);
    }
  }
</script>
