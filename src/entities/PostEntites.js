class PostEntites{
    constructor({id , title , content , author}){
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }
}

module.exports = PostEntites;


// شو هو الـ class Post؟
// هاد الكلاس عبارة عن موديل أو كيان (Entity) بيمثل مقالة (بوست) بالمدونة.

// كل مقال عنده صفات (خصائص) مثل:

// id → رقم تعريف خاص بكل مقال

// title → عنوان المقال

// content → محتوى المقال

// author → صاحب المقال أو الكاتب

// شرح الـ constructor
// لما تنشئ كائن جديد من نوع Post، لازم تعطيه كائن (Object) فيه هالخصائص.

// الـ constructor بياخد هالكائن وبيحط القيم على خصائص الكائن الجديد.