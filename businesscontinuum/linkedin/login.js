document.getElementById('trigger-button').addEventListener('click', async () => {
    const token = '<YOUR_PERSONAL_ACCESS_TOKEN>';
    const workflowUrl = 'https://api.github.com/repos/<USERNAME>/<REPOSITORY>/actions/workflows/<WORKFLOW_FILE.yml>/dispatches';
  
    // Trigger the GitHub Action
    const triggerResponse = await fetch(workflowUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json'
      },
      body: JSON.stringify({
        ref: 'main', // The branch where the workflow is located
      })
    });
  
    if (!triggerResponse.ok) {
      alert('Failed to trigger workflow!');
      return;
    }
  
    // Wait and fetch the workflow outputs
    const runsUrl = `https://api.github.com/repos/<USERNAME>/<REPOSITORY>/actions/runs`;
    const runsResponse = await fetch(runsUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json'
      }
    });
    
    const runsData = await runsResponse.json();
    const latestRun = runsData.workflow_runs[0]; // Get the most recent run
    const logsUrl = latestRun.logs_url;
  
    // Fetch the logs to capture the generated URL
    const logsResponse = await fetch(logsUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json'
      }
    });
  
    const logsText = await logsResponse.text();
    const authUrlMatch = logsText.match(/auth_url=(.+)/);
    if (authUrlMatch) {
      const authUrl = authUrlMatch[1];
      alert(`Open the following URL to authorize the app:\n${authUrl}`);
    } else {
      alert('Failed to retrieve the authorization URL!');
    }
  });