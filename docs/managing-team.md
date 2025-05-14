# Managing Team Members

This document explains how to manage team member information on the ASI Saga website.

## Data Structure

Team member information is stored in `_data/team.yml` and displayed on the About page. 

### Structure of `_data/team.yml`

```yaml
# Team members array
members:
  - name: Jane Doe
    role: AI Research Lead
    bio: Bio text goes here...
    image: jane-doe.jpg # Optional - image filename
    linkedin: jane-doe # Optional - LinkedIn username
```

Each team member entry can have the following properties:

- `name`: The team member's name (required)
- `role`: The team member's job title or role (required) 
- `bio`: A short biography or description (required)
- `image`: Filename of profile image (optional)
- `linkedin`: LinkedIn username for the "Connect" button (optional)

## Adding/Modifying Team Members

1. Edit `_data/team.yml` to add, remove, or update team member information
2. If using profile images:
   - Add properly sized square images to `/assets/images/team/`
   - Use the filename specified in the `image` property
   - Recommended image size: 400x400 pixels, in JPG or PNG format

## Team Component in the About Page

The About page (`/about/index.html`) automatically displays team members from the data file:

```liquid
<section class="about-team-section">
  {% include section-header.html title="Our Team" %}
  
  <div class="about-team-grid">
    {% for member in site.data.team.members %}
      <div class="about-team-member">
        {% if member.image %}
        <div class="about-team-member-image">
          <img src="{{ '/assets/images/team/' | append: member.image | relative_url }}" 
               alt="{{ member.name }}" class="img-fluid rounded-circle">
        </div>
        {% endif %}
        <h3 class="about-team-member-name">{{ member.name }}</h3>
        <p class="about-team-member-role">{{ member.role }}</p>
        <p class="about-team-member-bio">{{ member.bio }}</p>
        {% if member.linkedin %}
          <a href="https://www.linkedin.com/in/{{ member.linkedin }}" 
             class="about-team-member-link" target="_blank" rel="noopener">
            <i class="bi bi-linkedin"></i> Connect on LinkedIn
          </a>
        {% endif %}
      </div>
    {% endfor %}
  </div>
</section>
```

## Styling

Team member cards are styled in `/assets/css/pages/_about.scss`. The styles include:

- Card layout with hover effects
- Profile image styling (circular with border)
- Text styling for name, role, and bio
- LinkedIn button styling

Modify this file if you need to change the appearance of team member cards.
