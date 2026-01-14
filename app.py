from flask import Flask, jsonify, render_template, send_from_directory

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/resume/<path:filename>')
def serve_resume(filename):
    return send_from_directory('static/resume', filename)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/projects')
def get_projects():
    projects = [
        {
            'id': 1,
            'title': 'Faculty Evaluation System',
            'category': 'Web Application',
            'description': 'Built a Faculty Evaluation System for MOIST as a 3rd-year academic project. Helped the Guidance Office manage student feedback on teachers.',
            'technologies': ['PHP', 'MySQL', 'HTML/CSS', 'AJAX'],
            'year': '2022-2023',
            'company': 'MOIST',
            'image': '5d1c1098-a111-4472-8c71-827584a64b2a.jfif',
            'github_link': 'https://github.com/Carls431/Faculty-Evaluation',
            'demo_video': 'https://drive.google.com/file/d/1hqeQ5Ta0yXfBbZh2-0kX4-Ep5TqOEwUa/view?usp=drive_link'
        },
        {
            'id': 2,
            'title': 'Shoe Shop Management System',
            'category': 'Management System',
            'description': 'Developed a Shoe Shop Management System for a local business. Included inventory tracking, sales management, and reporting features.',
            'technologies': ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
            'year': '2022-2024',
            'company': 'Shoeshop Local',
            'image': 'shoe-shop.jpg'
        },
        {
            'id': 3,
            'title': 'Water-Refilling Inventory System',
            'category': 'Inventory Management',
            'description': 'Developed a comprehensive inventory management system for water-refilling business. Features include stock tracking, order management, customer records, and sales reporting.',
            'technologies': ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript', 'Bootstrap'],
            'year': '2023-2024',
            'company': 'Personal Project',
            'image': 'Screenshot 2026-01-03 150657.png',
            'github_link': '',
            'demo_video': 'https://drive.google.com/file/d/1cisxRi_GiIbZnL-cxxjIDgO98VBNOiMx/view?usp=drive_link'
        },
        {
            'id': 4,
            'title': 'Cleaning Service Website',
            'category': 'Live Website',
            'description': 'Developed and deployed a professional cleaning service website with live hosting. Features include service listings, booking system, contact forms, and responsive design for optimal user experience.',
            'technologies': ['Python', 'Flask', 'JavaScript', 'HTML/CSS', 'Responsive Design', 'Live Hosting'],
            'year': '2024',
            'company': 'Live Project',
            'image': 'wala.png',
            'github_link': 'https://github.com/Carls431/cleaning-service-website/tree/main/.windsurf/cleaning-web',
            'live_link': 'https://carls.pythonanywhere.com/'
        }
    ]
    return jsonify(projects)

@app.route('/api/skills')
def get_skills():
    skills = {
        'technical': ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript', 'TypeScript', 'React JS', 'UI/UX Design (Figma)', 'Bootstrap', 'AJAX', 'Python', 'Flask', 'Google Ads', 'Landing Page Optimization', 'VSL Page Development', 'Database Design', 'API Development'],
        'soft': ['Time Management', 'Adaptability', 'Creativity', 'Critical Thinking', 'Problem Solving', 'Team Collaboration']
    }
    return jsonify(skills)

@app.route('/api/experience')
def get_experience():
    experience = [
        {
            'title': 'VSL Developer & HTML Structure Specialist',
            'company': 'Digital Marketing Agency',
            'period': '2024 - Present',
            'description': 'VSL Developer and HTML Structure Specialist focused on creating high-converting landing pages and VSL pages for Google Ads campaigns. Expert in HTML structure modification to optimize ad performance, ensure compliance, and enable fast rendering for better ad delivery.'
        },
        {
            'title': 'System Developer',
            'company': 'Shoeshop Local',
            'period': '2022 - 2024',
            'description': 'Developed a Shoe Shop Management System for a local business. Included inventory tracking, sales management, and reporting features.'
        },
        {
            'title': 'System Developer',
            'company': 'MOIST',
            'period': '2022 - 2023',
            'description': 'Built a Faculty Evaluation System for a 3rd-year academic project. Helped the Guidance Office manage student feedback on teachers.'
        },
        {
            'title': 'System Developer',
            'company': 'Water-Refilling Business',
            'period': '2019 - 2024',
            'description': 'Developed a comprehensive inventory management system for water-refilling business. Features include stock tracking, order management, customer records, and sales reporting.'
        }
    ]
    return jsonify(experience)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
