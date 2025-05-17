# Community Features Documentation

This document outlines the community features implemented in the ASI Saga website, particularly focusing on the Thought Lab page and its forum functionality.

## Overview

The ASI Saga website includes interactive community features that allow users to engage with content, participate in discussions, and attend virtual events. These features are primarily located in the Thought Lab section, which serves as a collaborative space for idea exchange.

## Thought Lab Community Forum

The Thought Lab page includes a comprehensive community forum with the following features:

### 1. Forum Navigation

The forum uses tabbed navigation with three main sections:
- **Trending**: Displays popular discussions sorted by engagement
- **Latest**: Shows the most recent discussions
- **Categories**: Organizes discussions by topic categories

### 2. Discussion Items

Each discussion in the forum includes:
- **User Avatar**: Image representing the discussion author
- **Title**: Clickable discussion title linking to the full content
- **Meta Information**: Author name, posting date, comment count
- **Excerpt**: Brief summary of the discussion content
- **Tags**: Topic categories using color-coded badges

### 3. Category System

Discussions are organized into categories:
- Philosophy & Ethics
- Technology
- Art & Creativity
- Science
- Society & Culture
- Ideas & Innovations

Each category has a visual icon and displays the number of active topics.

## Live Events System

The Thought Lab includes an events system with:

### 1. Calendar Navigation

- Browse events by month with previous/next navigation
- View upcoming events in chronological order

### 2. Event Display

Each event includes:
- **Date**: Day and month of the event
- **Title**: Event name or topic
- **Meta Information**: Time, duration, and host
- **Description**: Brief overview of the event content
- **Action Buttons**: Registration and calendar integration

### 3. Event Types

The system supports various event formats:
- Webinars
- Panel Discussions
- Workshops
- Q&A Sessions
- Collaborative Workspaces

## Technical Implementation

### Forum Component Structure

```html
<section class="thoughtlab-forum-section">
  <div class="container">
    <!-- Forum tabs navigation -->
    <ul class="nav nav-tabs forum-tabs" id="forumTabs" role="tablist">
      <!-- Tab items -->
    </ul>
    
    <!-- Forum tab content -->
    <div class="tab-content forum-content" id="forumTabContent">
      <!-- Tab panes with forum content -->
    </div>
  </div>
</section>
```

### Events Component Structure

```html
<section class="thoughtlab-events-section">
  <div class="container">
    <!-- Calendar navigation -->
    <div class="calendar-nav">
      <!-- Month navigation -->
    </div>
    
    <!-- Events list -->
    <div class="events-list">
      <!-- Individual event items -->
    </div>
  </div>
</section>
```

## Customization

### Adding New Forum Categories

To add a new forum category:

1. Update the UI in `thoughtlab/index.html`:
```html
<div class="col-md-4 mb-4">
  <a href="#" class="category-card">
    <div class="category-icon">
      <i class="fas fa-[icon-name]"></i>
    </div>
    <h5>Category Name</h5>
    <span class="category-count">0 topics</span>
  </a>
</div>
```

2. Add any necessary styling in `_thoughtlab-page.scss`

### Adding New Events

To add new events:

1. Create a new event item in the events list:
```html
<div class="event-item" data-aos="fade-up">
  <div class="event-date">
    <span class="event-day">DD</span>
    <span class="event-month">MMM</span>
  </div>
  <div class="event-content">
    <h4 class="event-title">Event Title</h4>
    <!-- Event details -->
  </div>
</div>
```

## Accessibility Considerations

The community features incorporate several accessibility enhancements:

- Semantic HTML5 elements for proper document structure
- ARIA labels on interactive elements
- Sufficient color contrast for text legibility
- Keyboard navigable interface
- Screen reader compatible content structure

## Integration with Data Files

The community forum and events system can be integrated with Jekyll data files for dynamic content:

1. Create a `_data/forum.yml` file for discussions
2. Create a `_data/events.yml` file for upcoming events
3. Reference data in templates using `{{ site.data.forum.discussions }}`

## Future Enhancements

Planned enhancements for the community features include:

1. User authentication system
2. Real-time comment functionality
3. User profile pages
4. Discussion search capability
5. Event registration integration
6. Email notifications for discussions and events
