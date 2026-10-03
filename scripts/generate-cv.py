import json
import sys
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer

data = json.load(sys.stdin)
profile = data["profile"]
if not profile.get("isPlaceholder", True) or not profile.get("cv"):
    raise SystemExit("Hồ sơ hiện dùng nội dung thật. Thêm CV thật vào public/cv và cập nhật profile.cv; script CV mẫu không tạo hoặc ghi đè CV của hồ sơ này.")
root = Path(__file__).resolve().parent.parent
target = root / "public" / profile["cv"].lstrip("/")
target.parent.mkdir(parents=True, exist_ok=True)

font_root = Path("C:/Windows/Fonts")
pdfmetrics.registerFont(TTFont("Body", str(font_root / "arial.ttf")))
pdfmetrics.registerFont(TTFont("BodyBold", str(font_root / "arialbd.ttf")))
pdfmetrics.registerFont(TTFont("Heading", str(font_root / "times.ttf")))
pdfmetrics.registerFontFamily("Body", normal="Body", bold="BodyBold", italic="Body", boldItalic="BodyBold")

red = colors.HexColor("#B8403A")
ink = colors.HexColor("#25221F")
muted = colors.HexColor("#77716B")
rule = colors.HexColor("#E8E3DC")
styles = {
    "label": ParagraphStyle("label", fontName="BodyBold", fontSize=7, leading=11, textColor=red, spaceAfter=8),
    "name": ParagraphStyle("name", fontName="Heading", fontSize=32, leading=38, textColor=ink, spaceAfter=5),
    "body": ParagraphStyle("body", fontName="Body", fontSize=8.3, leading=13, textColor=muted, spaceAfter=7),
    "section": ParagraphStyle("section", fontName="BodyBold", fontSize=9, leading=14, textColor=red, spaceBefore=15, spaceAfter=8),
    "item": ParagraphStyle("item", fontName="BodyBold", fontSize=8.6, leading=13, textColor=ink, spaceAfter=3),
    "meta": ParagraphStyle("meta", fontName="Body", fontSize=7.5, leading=11, textColor=muted, spaceAfter=5),
}

story = []

def paragraph(text, style="body"):
    story.append(Paragraph(escape(text), styles[style]))

def section(title):
    paragraph(title, "section")
    story.append(HRFlowable(width="100%", thickness=0.5, color=rule, spaceAfter=8))

paragraph("CV MẪU / PORTFOLIO DU LỊCH", "label")
paragraph(profile["name"], "name")
paragraph("Tourism / Culture / Communication", "meta")
paragraph(f'{profile["location"]} | {profile["email"]} | {profile["phone"]}', "meta")
story.append(Spacer(1, 7))
paragraph("Hồ sơ minh họa. Toàn bộ thông tin cá nhân, kinh nghiệm và chứng chỉ dưới đây là nội dung mẫu; cần thay bằng hồ sơ thật trước khi ứng tuyển.")

section("GIỚI THIỆU & ĐỊNH HƯỚNG")
paragraph(profile["about"]["lead"])
paragraph(profile["about"]["paragraphs"][1])

section("KINH NGHIỆM & HOẠT ĐỘNG")
for experience in data["experiences"][:3]:
    paragraph(experience["organization"], "item")
    paragraph(experience["period"], "meta")
    paragraph(experience["description"])

section("KỸ NĂNG")
for group in data["skillGroups"]:
    paragraph(f'{group["title"]}: {"; ".join(group["items"])}')

section("THÀNH TÍCH & CHỨNG CHỈ")
for achievement in data["achievements"][:2]:
    paragraph(f'{achievement["year"]} / {achievement["title"]} - {achievement["organization"]}')

def footer(canvas, document):
    canvas.setStrokeColor(rule)
    canvas.line(42, 39, A4[0] - 42, 39)
    canvas.setFont("Body", 7)
    canvas.setFillColor(muted)
    canvas.drawString(42, 25, "HỒ SƠ MẪU - CHƯA DÙNG ĐỂ ỨNG TUYỂN")
    canvas.drawRightString(A4[0] - 42, 25, str(document.page))

document = SimpleDocTemplate(str(target), pagesize=A4, rightMargin=42, leftMargin=42, topMargin=36, bottomMargin=55, title=f'{profile["name"]} - CV mẫu', author=profile["name"])
document.build(story, onFirstPage=footer, onLaterPages=footer)
print(f"Created {target}")
