-- INSTRUCTIONS:
-- 1. Go to your Supabase Dashboard > SQL Editor.
-- 2. Run the following query to get your User ID:
--    SELECT id, email FROM auth.users;
-- 3. Copy your User ID (UUID).
-- 4. Replace 'YOUR_USER_ID_HERE' in the INSERT statement below with your copied UUID.
-- 5. Run the modified INSERT statement.

INSERT INTO bookmarks (user_id, title, url)
VALUES 
    ('YOUR_USER_ID_HERE', 'Project Gutenberg', 'https://www.gutenberg.org/'),
    ('YOUR_USER_ID_HERE', 'Internet Archive', 'https://archive.org/'),
    ('YOUR_USER_ID_HERE', 'Open Library', 'https://openlibrary.org/'),
    ('YOUR_USER_ID_HERE', 'Standard Ebooks', 'https://standardebooks.org/'),
    ('YOUR_USER_ID_HERE', 'Library of Congress', 'https://www.loc.gov/'),
    ('YOUR_USER_ID_HERE', 'The British Library', 'https://www.bl.uk/'),
    ('YOUR_USER_ID_HERE', 'Europeana', 'https://www.europeana.eu/'),
    ('YOUR_USER_ID_HERE', 'HathiTrust Digital Library', 'https://www.hathitrust.org/'),
    ('YOUR_USER_ID_HERE', 'NASA Image and Video Library', 'https://images.nasa.gov/'),
    ('YOUR_USER_ID_HERE', 'Smithsonian API', 'https://www.si.edu/openaccess');
