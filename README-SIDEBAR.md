# Adding Sidebar Navigation to All Pages

To add the sidebar navigation to all student pages, follow these steps:

1. We've already created a reusable sidebar template in `/frontend/public/sidebar-template.js`
2. We've updated the following pages as examples:
   - `dashboard.htm`
   - `attendance.htm`
   - `marks.htm`
   - `hostelmenu.htm`

3. For all other pages, follow this pattern:

## Step 1: Update the head section
Replace the existing head section with:

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="UTF-8" />
  <title>Page Title</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="/sidebar-template.js"></script>
  <style>
    table {
      width: 100%;
      max-width: 800px;
      margin: 20px 0;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 10px;
      text-align: left;
      border: 1px solid #ddd;
    }
    
    th {
      background-color: #f2f2f2;
    }
    
    body.dark-mode th {
      background-color: #444;
    }
    
    body.dark-mode table,
    body.dark-mode th,
    body.dark-mode td {
      border-color: #444;
    }
  </style>
</head>
```

## Step 2: Update the body opening
Replace the existing body opening with:

```html
<body>
  <!-- Sidebar will be loaded by sidebar-template.js -->
  
  <!-- This content will be placed inside the main content area -->
  <h2>Page Title</h2>
```

## Step 3: Remove any dark mode toggle buttons and scripts
The dark mode toggle is now handled by the sidebar template.

## Step 4: Remove any border attributes from tables
Change `<table border="1">` to just `<table>`.

## Alternative: Copy from Template
You can also copy from the template file we created at `/frontend/pages/template.htm` and just replace the content inside the main area.

## How It Works
- The sidebar template automatically adds the sidebar, header, and profile section to each page
- It handles dark mode toggling
- It highlights the current page in the navigation
- It checks if the user is logged in and redirects to login if needed
- It displays the user's name and first initial in the profile section