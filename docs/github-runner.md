# Github CI Runner

This project uses Github Actions to run CI/CD pipelines. Since it is public, the cost
of running Github Actions is free.

## Challenges

### 1. Set up a self-hosted runner

Besides the free tier, Github Actions runners are actually quite expensive. The cost
of running a self-hosted runner is much cheaper.

Setting up self-hosted runners is already documented in the [official Github documentation](https://docs.github.com/en/actions/hosting-your-own-runners/adding-self-hosted-runners).

In summary, you need to:

1.  Go to your repository settings
2.  Go to the Actions tab
3.  Click on "New self-hosted runner"
4.  Follow the instructions and copy the script and token to connect the runner to your repository

Another options that I found is [RunsOn](https://runs-on.com).
It is a self-hosted runner that is very simple to switch from the free tier to a self-hosted runner.
You just need to replace:

```yaml
runs-on: ubuntu-latest
```

with:

```yaml
runs-on: [runs-on=${{ github.run_id }}, runner=whatever-you-need }}]
```

I ended up using RunsOn because it is simpler and use AWS so I can deploy my application to AWS as well. It is also free for non-commercial use and the runner will also automatically shut down when not in use.

### 2. Debugging the CI/CD pipeline

When setting up CI/CD pipelines, I found it difficult to debug the pipeline when it fails. So these 2 lines helped me save the day:

```yaml
- name: Setup tmate session
  uses: mxschmitt/action-tmate@v3
```

This will set up a tmate session that you can connect to and debug the pipeline. Think of it as a breakpoint in your code. After that, rerun the pipeline and check the logs for the tmate session link.
