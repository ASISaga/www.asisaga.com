const fetchAuthUrl = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/YOUR_USERNAME/YOUR_REPOSITORY/actions/artifacts', {
        headers: {
          Authorization: `Bearer YOUR_PERSONAL_ACCESS_TOKEN`
        }
      });
  
      const data = await response.json();
      const artifact = data.artifacts.find(a => a.name === 'linkedin-auth-url');
  
      if (!artifact) {
        throw new Error('Auth URL artifact not found.');
      }
  
      const artifactDownloadResponse = await fetch(artifact.archive_download_url, {
        headers: {
          Authorization: `Bearer YOUR_PERSONAL_ACCESS_TOKEN`
        }
      });
  
      const authUrlText = await artifactDownloadResponse.text();
      return authUrlText.trim(); // The LinkedIn Auth URL
    } catch (error) {
      console.error('Failed to fetch auth URL:', error);
      alert('Failed to fetch auth URL. Please try again.');
    }
  };
  
  document.getElementById('login-with-linkedin').addEventListener('click', async () => {
    const authUrl = await fetchAuthUrl();
    if (authUrl) {
      window.location.href = authUrl; // Redirect to LinkedIn login page
    }
  });