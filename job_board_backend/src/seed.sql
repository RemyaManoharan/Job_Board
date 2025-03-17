INSERT INTO users (f_name, l_name, email, password, role, created_at)
VALUES 
  ('Admin', 'User', 'admin@jobboard.com', '$2a$10$3QeXwpnblmO/QxdODl/N9.xHqnG7YoLRNLuGazhdKCQU8dHEgQ8aW', 'admin', NOW() - INTERVAL '30 days'),
  ('John', 'Doe', 'john.doe@example.com', '$2a$10$3QeXwpnblmO/QxdODl/N9.xHqnG7YoLRNLuGazhdKCQU8dHEgQ8aW', 'user', NOW() - INTERVAL '25 days'),
  ('Jane', 'Smith', 'jane.smith@example.com', '$2a$10$3QeXwpnblmO/QxdODl/N9.xHqnG7YoLRNLuGazhdKCQU8dHEgQ8aW', 'user', NOW() - INTERVAL '20 days'),
  ('Robert', 'Johnson', 'robert.johnson@example.com', '$2a$10$3QeXwpnblmO/QxdODl/N9.xHqnG7YoLRNLuGazhdKCQU8dHEgQ8aW', 'user', NOW() - INTERVAL '15 days'),
  ('Emily', 'Davis', 'emily.davis@example.com', '$2a$10$3QeXwpnblmO/QxdODl/N9.xHqnG7YoLRNLuGazhdKCQU8dHEgQ8aW', 'user', NOW() - INTERVAL '10 days')
ON CONFLICT (email) DO NOTHING;

-- Sample Companies
INSERT INTO companies (name, description, website_url, location, created_at)
VALUES
  ('TechCorp', 'A leading technology company specializing in innovative software solutions', 'https://techcorp.example.com', 'New York, NY', NOW() - INTERVAL '30 days'),
  ('DataSystems', 'Enterprise database and data management solutions provider', 'https://datasystems.example.com', 'San Francisco, CA', NOW() - INTERVAL '28 days'),
  ('CreativeStudio', 'Award-winning design agency focusing on user experience and branding', 'https://creativestudio.example.com', 'Chicago, IL', NOW() - INTERVAL '25 days'),
  ('GrowthHackers', 'Digital marketing agency with expertise in growth marketing', 'https://growthhackers.example.com', 'Austin, TX', NOW() - INTERVAL '22 days'),
  ('InnovateSoft', 'Software development company specializing in mobile applications', 'https://innovatesoft.example.com', 'Seattle, WA', NOW() - INTERVAL '20 days'),
  ('CloudNine', 'Cloud infrastructure and services provider', 'https://cloudnine.example.com', 'Boston, MA', NOW() - INTERVAL '18 days'),
  ('SecureTech', 'Cybersecurity solutions and consulting services', 'https://securetech.example.com', 'Washington, DC', NOW() - INTERVAL '15 days'),
  ('FinTechPro', 'Financial technology software and services', 'https://fintechpro.example.com', 'Miami, FL', NOW() - INTERVAL '12 days')
ON CONFLICT (website_url) DO NOTHING;

-- Sample Jobs
INSERT INTO jobs (title, description, skills, responsibilities, location, salary, category, is_remote, status, company_id, created_at)
VALUES
  (
    'Frontend Developer', 
    'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces using React and TypeScript.',
    ARRAY['React', 'TypeScript', 'CSS', 'HTML', 'Redux'],
    'Developing user interfaces, collaborating with backend developers, ensuring responsive design, optimizing application for maximum speed and scalability.',
    'New York, NY', 
    90000.00, 
    'Engineering', 
    true,
    'active',
    (SELECT company_id FROM companies WHERE name = 'TechCorp'),
    NOW() - INTERVAL '27 days'
  ),
  (
    'Backend Engineer', 
    'Join our backend team to develop robust APIs and services using Node.js and PostgreSQL.',
    ARRAY['Node.js', 'Express', 'PostgreSQL', 'RESTful APIs', 'Docker'],
    'Designing and implementing APIs, database design, integration with frontend, performance optimization, writing technical documentation.',
    'San Francisco, CA', 
    110000.00, 
    'Engineering', 
    false,
    'active',
    (SELECT company_id FROM companies WHERE name = 'DataSystems'),
    NOW() - INTERVAL '25 days'
  ),
  (
    'UI/UX Designer', 
    'Help us create beautiful and intuitive user experiences for our products.',
    ARRAY['Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping'],
    'Creating wireframes, prototypes, and mockups, conducting user research, collaborating with developers, designing intuitive interfaces.',
    'Chicago, IL', 
    85000.00, 
    'Design', 
    true,
    'active',
    (SELECT company_id FROM companies WHERE name = 'CreativeStudio'),
    NOW() - INTERVAL '23 days'
  ),
  (
    'Marketing Manager', 
    'Lead our marketing initiatives and help us grow our user base.',
    ARRAY['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Social Media'],
    'Developing marketing strategies, managing campaigns, analyzing data, coordinating with the sales team, managing the marketing budget.',
    'Austin, TX', 
    95000.00, 
    'Marketing', 
    false,
    'active',
    (SELECT company_id FROM companies WHERE name = 'GrowthHackers'),
    NOW() - INTERVAL '21 days'
  ),
  (
    'Mobile App Developer', 
    'Develop cutting-edge mobile applications for iOS and Android platforms.',
    ARRAY['React Native', 'Swift', 'Java', 'Mobile Development', 'API Integration'],
    'Designing and building advanced applications for iOS and Android platforms, ensuring the performance and quality of applications, collaborating with cross-functional teams.',
    'Seattle, WA', 
    105000.00, 
    'Engineering', 
    false,
    'active',
    (SELECT company_id FROM companies WHERE name = 'InnovateSoft'),
    NOW() - INTERVAL '19 days'
  ),
  (
    'DevOps Engineer', 
    'Join our cloud team to build and maintain our infrastructure and deployment pipelines.',
    ARRAY['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
    'Implementing and automating CI/CD pipelines, managing cloud infrastructure, monitoring systems, ensuring high availability and performance.',
    'Boston, MA', 
    115000.00, 
    'Engineering', 
    true,
    'active',
    (SELECT company_id FROM companies WHERE name = 'CloudNine'),
    NOW() - INTERVAL '17 days'
  ),
  (
    'Cybersecurity Analyst', 
    'Protect our systems and data from cyber threats and vulnerabilities.',
    ARRAY['Network Security', 'Penetration Testing', 'Security Auditing', 'Threat Analysis', 'OWASP'],
    'Monitoring security systems, performing vulnerability assessments, analyzing security breaches, implementing security measures, providing security awareness training.',
    'Washington, DC', 
    100000.00, 
    'Security', 
    false,
    'active',
    (SELECT company_id FROM companies WHERE name = 'SecureTech'),
    NOW() - INTERVAL '14 days'
  ),
  (
    'Full Stack Developer', 
    'Build and maintain both frontend and backend components of our financial applications.',
    ARRAY['JavaScript', 'React', 'Node.js', 'MongoDB', 'RESTful APIs', 'GraphQL'],
    'Developing end-to-end web applications, collaborating with product managers, writing clean and maintainable code, participating in code reviews.',
    'Miami, FL', 
    108000.00, 
    'Engineering', 
    true,
    'active',
    (SELECT company_id FROM companies WHERE name = 'FinTechPro'),
    NOW() - INTERVAL '10 days'
  ),
  (
    'Data Scientist', 
    'Analyze complex data sets to provide insights and develop predictive models.',
    ARRAY['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistical Analysis'],
    'Building data models, analyzing large datasets, developing algorithms, creating visualization tools, communicating findings to stakeholders.',
    'San Francisco, CA', 
    120000.00, 
    'Data Science', 
    true,
    'active',
    (SELECT company_id FROM companies WHERE name = 'DataSystems'),
    NOW() - INTERVAL '7 days'
  ),
  (
    'Project Manager', 
    'Lead and coordinate our technology projects from inception to completion.',
    ARRAY['Agile', 'Scrum', 'Project Planning', 'Budgeting', 'Stakeholder Management'],
    'Planning project schedules, coordinating team members, managing resources, reporting project status, mitigating risks and issues.',
    'New York, NY', 
    98000.00, 
    'Management', 
    false,
    'active',
    (SELECT company_id FROM companies WHERE name = 'TechCorp'),
    NOW() - INTERVAL '5 days'
  );

-- Sample Job Applications
INSERT INTO job_applications (job_id, applicant_id, name, email, contact_number, resume_url, applied_at)
VALUES
  (
    (SELECT job_id FROM jobs WHERE title = 'Frontend Developer' LIMIT 1),
    (SELECT user_id FROM users WHERE email = 'john.doe@example.com'),
    'John Doe',
    'john.doe@example.com',
    '+1-555-123-4567',
    'https://storage.example.com/resumes/john_doe_resume.pdf',
    NOW() - INTERVAL '25 days'
  ),
  (
    (SELECT job_id FROM jobs WHERE title = 'UI/UX Designer' LIMIT 1),
    (SELECT user_id FROM users WHERE email = 'jane.smith@example.com'),
    'Jane Smith',
    'jane.smith@example.com',
    '+1-555-987-6543',
    'https://storage.example.com/resumes/jane_smith_resume.pdf',
    NOW() - INTERVAL '20 days'
  ),
  (
    (SELECT job_id FROM jobs WHERE title = 'Backend Engineer' LIMIT 1),
    (SELECT user_id FROM users WHERE email = 'robert.johnson@example.com'),
    'Robert Johnson',
    'robert.johnson@example.com',
    '+1-555-456-7890',
    'https://storage.example.com/resumes/robert_johnson_resume.pdf',
    NOW() - INTERVAL '18 days'
  ),
  (
    (SELECT job_id FROM jobs WHERE title = 'Full Stack Developer' LIMIT 1),
    (SELECT user_id FROM users WHERE email = 'emily.davis@example.com'),
    'Emily Davis',
    'emily.davis@example.com',
    '+1-555-789-0123',
    'https://storage.example.com/resumes/emily_davis_resume.pdf',
    NOW() - INTERVAL '10 days'
  ),
  (
    (SELECT job_id FROM jobs WHERE title = 'Data Scientist' LIMIT 1),
    (SELECT user_id FROM users WHERE email = 'john.doe@example.com'),
    'John Doe',
    'john.doe@example.com',
    '+1-555-123-4567',
    'https://storage.example.com/resumes/john_doe_resume.pdf',
    NOW() - INTERVAL '5 days'
  );