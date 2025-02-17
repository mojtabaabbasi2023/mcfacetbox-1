import type { ISimpleTree } from '@/types/baseModels'

interface DB {
  mainTree: ISimpleTree
}

export const db: DB = {
  mainTree: {
    id: 1,
    title: 'چالش‌های خانوادگی',
    selected: false,
    children: [
      {
        id: 2,
        title: 'تربیت کودکان',
        selected: false,
        children: [
          {
            id: 3,
            title: 'روش‌های تربیتی',
            selected: false,
            children: [
              {
                id: 4,
                title: 'تربیت مثبت',
                selected: false,
              },
              {
                id: 5,
                title: 'تربیت سمی',
                selected: false,

              },
            ],
          },
          {
            id: 6,
            title: 'مشکلات رفتاری',
            selected: false,
            children: [
              {
                id: 7,
                title: 'پرخاشگری در کودکان',
                selected: false,

              },
              {
                id: 8,
                title: 'اضطراب جدایی',
                selected: false,

              },
            ],
          },
        ],
      },
      {
        id: 9,
        title: 'ارتباطات خانوادگی',
        selected: false,
        children: [
          {
            id: 10,
            title: 'بهبود ارتباطات',
            selected: false,
            children: [
              {
                id: 11,
                title: 'گفتگوی مؤثر',
                selected: false,

              },
              {
                id: 12,
                title: 'مدیریت تعارضات',
                selected: false,

              },
            ],
          },
          {
            id: 13,
            title: 'پشتیبانی عاطفی',
            selected: false,
            children: [
              {
                id: 14,
                title: 'ابراز احساسات',
                selected: false,

              },
              {
                id: 15,
                title: 'تشویق و حمایت',
                selected: false,

              },
            ],
          },
        ],
      },
      {
        id: 16,
        title: 'چالش‌های اقتصادی',
        selected: false,
        children: [
          {
            id: 17,
            title: 'مدیریت مالی خانواده',
            selected: false,
            children: [
              {
                id: 18,
                title: 'بودجه‌بندی',
                selected: false,

              },
              {
                id: 19,
                title: 'پس‌انداز برای آینده',
                selected: false,

              },
            ],
          },
          {
            id: 20,
            title: 'برنامه‌ریزی برای خرید',
            selected: false,
            children: [
              {
                id: 21,
                title: 'خریدهای ضروری',
                selected: false,

              },
              {
                id: 22,
                title: 'خریدهای غیرضروری',
                selected: false,

              },
            ],
          },
        ],
      },
      {
        id: 23,
        title: 'مدیریت زمان',
        selected: false,
        children: [
          {
            id: 24,
            title: 'تخصیص زمان برای خانواده',
            selected: false,
            children: [
              {
                id: 25,
                title: 'فعالیت‌های مشترک',
                selected: false,

              },
              {
                id: 26,
                title: 'مرخصی و استراحت',
                selected: false,

              },
            ],
          },
          {
            id: 27,
            title: 'مدیریت زمان شخصی',
            selected: false,
            children: [
              {
                id: 28,
                title: 'وقت‌گذاری برای خود',
                selected: false,

              },
              {
                id: 29,
                title: 'تعادل بین کار و خانواده',
                selected: false,

              },
            ],
          },
        ],
      },
      {
        id: 30,
        title: 'مشکلات زناشویی',
        selected: false,
        children: [
          {
            id: 31,
            title: 'حل تعارض‌ها',
            selected: false,
            children: [
              {
                id: 32,
                title: 'توافق برای رفتارها',
                selected: false,

              },
              {
                id: 33,
                title: 'مدیریت احساسات',
                selected: false,

              },
            ],
          },
          {
            id: 34,
            title: 'تقویت پیوند عاطفی',
            selected: false,
            children: [
              {
                id: 35,
                title: 'وقت‌گذاری دو نفره',
                selected: false,

              },
              {
                id: 36,
                title: 'ابراز محبت',
                selected: false,

              },
            ],
          },
        ],
      },
      {
        id: 37,
        title: 'مسائل مربوط به سالمندان',
        selected: false,
        children: [
          {
            id: 38,
            title: 'مراقبت‌های بهداشتی',
            selected: false,
            children: [
              {
                id: 39,
                title: 'ویزیت‌های پزشکی',
                selected: false,

              },
              {
                id: 40,
                title: 'تغذیه مناسب',
                selected: false,

              },
            ],
          },
          {
            id: 41,
            title: 'احساس تنهایی',
            selected: false,
            children: [
              {
                id: 42,
                title: 'ارتباطات اجتماعی',
                selected: false,

              },
              {
                id: 43,
                title: 'فعالیت‌های گروهی',
                selected: false,

              },
            ],
          },
        ],
      },
      {
        id: 44,
        title: 'چالش‌های سلامتی',
        selected: false,
        children: [
          {
            id: 45,
            title: 'سلامت روان',
            selected: false,
            children: [
              {
                id: 46,
                title: 'کاهش استرس',
                selected: false,

              },
              {
                id: 47,
                title: 'پشتیبانی عاطفی',
                selected: false,

              },
            ],
          },
          {
            id: 48,
            title: 'فعالیت‌های بدنی',
            selected: false,
            children: [
              {
                id: 49,
                title: 'ورزش خانوادگی',
                selected: false,

              },
              {
                id: 50,
                title: 'سفرهای تفریحی',
                selected: false,

              },
            ],
          },
        ],
      },
      {
        id: 51,
        title: 'آموزش و پرورش',
        selected: false,
        children: [
          {
            id: 52,
            title: 'نقش والدین در تحصیل',
            selected: false,
            children: [
              {
                id: 53,
                title: 'تشویق به مطالعه',
                selected: false,

              },
              {
                id: 54,
                title: 'حمایت از فعالیت‌های فوق برنامه',
                selected: false,

              },
            ],
          },
          {
            id: 55,
            title: 'مسائل آموزشی',
            selected: false,
            children: [
              {
                id: 56,
                title: 'مشکلات یادگیری',
                selected: false,

              },
              {
                id: 57,
                title: 'مدیریت اضطراب امتحانات',
                selected: false,

              },
            ],
          },
        ],
      },
      {
        id: 58,
        title: 'فرهنگ و هویت خانواده',
        selected: false,
        children: [
          {
            id: 59,
            title: 'انتقال ارزش‌ها',
            selected: false,
            children: [
              {
                id: 60,
                title: 'سنت‌ها و آداب',
                selected: false,

              },
              {
                id: 61,
                title: 'تشویق به مسئولیت‌پذیری',
                selected: false,

              },
            ],
          },
          {
            id: 62,
            title: 'تقویت هویت خانوادگی',
            selected: false,
            children: [
              {
                id: 63,
                title: 'برگزاری جشن‌ها',
                selected: false,

              },
              {
                id: 64,
                title: 'داستان‌های خانوادگی',
                selected: false,

              },
            ],
          },
        ],
      },
      {
        id: 65,
        title: 'مدیریت بحران',
        selected: false,
        children: [
          {
            id: 66,
            title: 'برخورد با مشکلات ناگهانی',
            selected: false,
            children: [
              {
                id: 67,
                title: 'گام‌های اولیه',
                selected: false,

              },
              {
                id: 68,
                title: 'حمایت از یکدیگر',
                selected: false,

              },
            ],
          },
          {
            id: 69,
            title: 'مدیریت استرس خانوادگی',
            selected: false,
            children: [
              {
                id: 70,
                title: 'تکنیک‌های تنفس عمیق',
                selected: false,

              },
              {
                id: 71,
                title: 'صحبت کردن در مورد احساسات',
                selected: false,

              },
            ],
          },
        ],
      },
      {
        id: 72,
        title: 'زندگی اجتماعی خانواده',
        selected: false,
        children: [
          {
            id: 73,
            title: 'فعالیت‌های اجتماعی مشترک',
            selected: false,
            children: [
              {
                id: 74,
                title: 'سازماندهی دورهمی‌ها',
                selected: false,

              },
              {
                id: 75,
                title: 'شرکت در رویدادهای محلی',
                selected: false,

              },
            ],
          },
          {
            id: 76,
            title: 'نقش رسانه‌ها در خانواده',
            selected: false,
            children: [
              {
                id: 77,
                title: 'مدیریت زمان استفاده از رسانه',
                selected: false,

              },
              {
                id: 78,
                title: 'آموزش استفاده صحیح',
                selected: false,

              },
            ],
          },
        ],
      },
      {
        id: 79,
        title: 'تعطیلات و سفرها',
        selected: false,
        children: [
          {
            id: 80,
            title: 'برنامه‌ریزی سفر خانوادگی',
            selected: false,
            children: [
              {
                id: 81,
                title: 'انتخاب مقصد جذاب',
                selected: false,

              },
              {
                id: 82,
                title: 'بودجه‌بندی سفر',
                selected: false,

              },
            ],
          },
          {
            id: 83,
            title: 'فعالیت‌های تفریحی',
            selected: false,
            children: [
              {
                id: 84,
                title: 'سفرهای جنگلی',
                selected: false,

              },
              {
                id: 85,
                title: 'سفرهای ساحلی',
                selected: false,

              },
            ],
          },
        ],
      },
    ],
  },

}
