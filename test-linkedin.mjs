

const testLinkedInPost = async () => {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const personId = process.env.LINKEDIN_PERSON_ID;

  if (!token || !personId) {
    console.error('Missing token or person ID in .env');
    return;
  }

  const authorUrn = `urn:li:person:${personId}`;
  
  const postData = {
    "author": authorUrn,
    "lifecycleState": "PUBLISHED",
    "specificContent": {
      "com.linkedin.ugc.ShareContent": {
        "shareCommentary": {
          "text": "Hello World! Testing API integration."
        },
        "shareMediaCategory": "NONE"
      }
    },
    "visibility": {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
  };

  console.log('Sending request to LinkedIn API with Author:', authorUrn);

  try {
    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error ${response.status}: ${errorText}`);
      return;
    }

    const data = await response.json();
    console.log('Success! Post created:', data);
  } catch (err) {
    console.error('Request failed:', err);
  }
};

testLinkedInPost();
