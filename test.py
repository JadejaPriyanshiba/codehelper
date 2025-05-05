from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font("Arial", "B", 12)
        self.cell(0, 10, "Gujarat Technological University", 0, 1, "C")
        self.cell(0, 10, "Diploma in Computer Engineering – Semester 4", 0, 1, "C")
        self.cell(0, 10, "Subject: Introduction to Software Engineering (4340702)", 0, 1, "C")
        self.cell(0, 10, "Conceptual Objective Question Paper", 0, 1, "C")
        self.ln(5)

    def chapter_title(self, title):
        self.set_font("Arial", "B", 12)
        self.cell(0, 10, title, 0, 1, "L")
        self.ln(2)

    def chapter_body(self, body):
        self.set_font("Arial", "", 11)
        self.multi_cell(0, 8, body)
        self.ln()

pdf = PDF()
pdf.add_page()

# Questions with marks
questions = [
    "(0.5 mark) Which software process model is best suited for projects with unclear and frequently changing requirements?",
    "(0.5 mark) In the V-Model, which phase corresponds to system testing?",
    "(1 mark) Differentiate between functional and non-functional requirements with examples.",
    "(1 mark) Why is risk analysis more emphasized in the Spiral Model than in other models?",
    "(1 mark) Explain the significance of modularity in software design.",
    "(2 marks) Draw and explain a Level 1 DFD for a library management system.",
    "(2 marks) Compare and contrast Agile and Waterfall models based on team communication, customer involvement, and delivery speed.",
    "(2 marks) A company is planning a large-scale, long-term project. Discuss which process model would be most suitable and justify your answer.",
    "(2 marks) Explain the concept of COCOMO and demonstrate with a sample estimation.",
    "(1 mark) What are the key characteristics of good software according to IEEE standards?",
    "(1 mark) How do acceptance testing and system testing differ in their goals and execution?",
    "(1 mark) Why is requirement validation critical before the design phase begins?",
    "(1 mark) Write a short note on the use of version control systems in Agile development.",
    "(1 mark) Explain how ER diagrams assist in the software design process.",
    "(2 marks) Develop a brief project schedule using Gantt chart principles for a 4-week online shopping portal development cycle."
]

pdf.chapter_title("Highly Conceptual & Intellectual Questions")
for q in questions:
    pdf.chapter_body(q)

pdf_output_path = "/mnt/data/ISE_Objective_Conceptual_Question_Paper.pdf"
pdf.output(pdf_output_path)

pdf_output_path