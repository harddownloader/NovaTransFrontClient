import React, { ReactElement } from "react"
import { CommonLayout } from "@/components/Layouts"

// assets
import classes from '@/styles/InfoPage.module.scss'

export const PrivacyPolicyPage = () => {
  return (
    <>
      <div className={classes.content_wrapper}>
        <h1 className={classes.heading}>Політика конфіденційності</h1>
        <p>Фізична особа-виконавець ФОП Станкова Лілія Сергіївна (далі–«Виконавець»), ЄДР ЮО ФОП ГФ 3188018428, адреса: 68450, Одеська обл., Болградський р-н, село Павлівка, вулиця Фрунзе, newtrans.com.ua(далі- Сайт).</p>
        <br/>
        <p>Згідно Закону України "Про захист персональних даних", заповнюючи дані реєстраційної форми та купуючи квиток, Ви даєте згоду на обробку Ваших персональних даних з метою забезпечення реалізації цивільно-правових відносин, дотримання вимог, що діють в сфері регулювання податкових відносин, відносин у сфері бухгалтерського обліку та відносин у сфері реклами.</p>
        <br/>
        <p>1. Обсяг персональних даних При реєстрації на Сайті і заповненні реєстраційної форми, Ви надаєте для обробки своїх персональні дані, зокрема, ім'я, прізвище, номер телефону, e-mail, логін, пароль тощо. Такі дані ми отримуємо тільки від осіб, які їх надають свідомо і за власним бажанням. Для того щоб зареєструватися на сайті newtrans.com.ua, купити квиток або іншим чином взаємодіяти з нами, Ви повинні уважно ознайомитись із Вашими правами і обов'язками по обробці персональних даних, зазначених у ст. 8 З.У. «Про захист персональних даних», уважно ознайомитись із цією політикою збереження конфіденційності, а також висловити свою повну згоду з їх умовами.</p>
        <br/>
        <p>2. Мета збору персональних даних Персональні дані - відомості чи сукупність відомостей про фізичну особу, яка ідентифікована або може бути конкретно ідентифікована. Ми можемо обробляти Ваші персональні дані для наступних цілей. При цьому одночасно можуть застосовуватися одна або кілька цілей: При реєстрації на сайті. Для того, щоб створити особистий кабінет для подальшого замовлення квитків ви повинні вказати свою особисту e-mail адресу. Дані в особистому кабінеті. Після реєстрації на сайті newtrans.com.ua у особистому кабінеті Ви вказуєте свої особисті дані: прізвище, ім’я, номер телефону та дату народження. При купівлі квитка заповнюються дані про пасажира, які можуть відрязнятись від данних, які вказані у особистомі кабінеті. (Купівля квитка для 3 особи) Для інформування Вас щодо рейсу, на який був куплений квиток. Для інформування Вас щодо акцій, знижок та відкриття нових маршрутів на сайті newtrans.com.ua/ Для відповіді щодо зауважень та претензій щодо роботи служби підтримки, персоналу рейсу, та рейсу загалом. Для відправлення Вам придбаних квитків. Для аналізу роботи додаткових сервісів з метою покращення роботи сайту. Ми діємо відповідно до цієї політики конфіденційності, на підставі Положення про обробку і захист персональних даних і на підставі чинного законодавства України. Ми маємо право зберігати персональні дані стільки, скільки необхідно для реалізації мети, зазначеної в даній Політиці або в терміни, встановлені чинним законодавством України або до моменту видалення Вами цих даних.</p>
        <br/>
        <p>3. Передача персональних даних третім особам Ми не продаємо, не передаємо і не розголошуємо персональні дані, які отримуємо на нашому сайті, третім сторонам без Вашої попередньої згоди. Ми розкриваємо персональні дані тільки в випадках, визначених чинним законодавством України, а також: Ми розкриємо інформацію задля запобігання злочину або нанесенню шкоди нам або третім особам; Ми розкриємо інформацію третім особам, які надають нам технічну підтримку та послуги, за допомогою яких Ви отримаєте Ваше замовлення.</p>
        <br/>
        <p>4. Оновлення політики конфіденційності Виконавець залишає за собою право вносити зміни в Політику конфіденційності. Всі зміни та дати змін будуть зазначені в даній Політиці конфіденційності.</p>
      </div>
    </>
  )
}

PrivacyPolicyPage.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>
}

export default PrivacyPolicyPage
