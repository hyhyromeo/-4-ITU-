import { Knex } from "knex"
import { hashPassword } from "../hash"

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("qr_code").del()
  await knex("point_record").del()
  await knex("gifts_history").del()
  await knex("medical_history").del()
  await knex("medical_services").del()
  await knex("medical_center").del()
  await knex("gifts").del()
  await knex("users").del()
  await knex("doctors").del()
  await knex("newsAndPromotion").del()

  // Inserts seed entries
  await knex("newsAndPromotion")
    .insert([
      {
        title: "inactive testing",
        description: "inactive testing",
        status: "inactive",
      },
      {
        title: "Welcome to ITU!",
        description: "We are happy to serve you!",
        status: "active",
      },
      {
        image:
          "https://www.neohealth.com.hk/images/body_check.jpg",
        title: "Baisc Body check Plan + Ultrasound of Abdominal Aorta",
        description: "Ultrasound of Abdominal Aorta (Include : Biliary Tree, Gallbladder, Liver, Kidneys, Pelvic Organs, Pancreas, Spleen)",
        status: "active",
      },
      {
        image:
          "https://www.healthgene.com.hk/wp-content/uploads/2019/02/842852678.jpg",
        title: "Hypertension Screening",
        description: "Online Reservation available now!",
        status: "active",
      },
      {
        image:
          "https://www.ideas.org.au/images/3d-render-of-covid19-nasal-swab-laboratory-test-picture-id1214431459.jpg",
        title: "COVID-19 Neutralising Antibody Test",
        description: "Package includes: COVID-19 Neutralising Antibody Test , lab report",
        status: "active",
      },
      {
        image:
          "https://media.allure.com/photos/5a66518d296f5478826632d6/16:9/w_2560%2Cc_limit/baby-botox.jpg",
        title: "Botox Treatment",
        description: "We all age, this is just a simple fact of life, and however, there are some individuals who regrettably feel they look older than their years.",
        status: "active",
      },
      {
        image:
          "https://hongkongfp.com/wp-content/uploads/2021/02/50714715547_ec8b32b115_k-1050x701.jpg",
        title: "Covid-19: BioNTech jabs to remain on hold in Hong Kong amid probe into defective packaging",
        description: "The government abruptly suspended the city's 21 community centres administering the vaccine city-wide on Wednesday morning.",
        status: "active",
      },
    ])

  const users = await knex("users")
    .insert([
      {
        name: "Curry Jack Lau",
        email: "curryJack@gmail.com",
        password: await hashPassword("pw1234"),
        membership_no: "JUN#8876",
        phone_number: "98765432",
        gender: "male",
        birthday: new Date("1997-09-09"),
        description: "Hi, my name is Jack, people call me Curry",
        icon: "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png",
        is_agent: false,
        is_admin: false,
        agent: "Gordon",
      },
      {
        name: "Jordan Sean Tsang",
        email: "JordanSean@gmail.com",
        password: await hashPassword("pw2"),
        phone_number: "98765433",
        gender: "male",
        birthday: new Date("1996-09-09"),
        description: "I am Sean the Jordan",
        icon: "https://cdn.iconscout.com/icon/free/png-256/avatar-366-456318.png",
        is_agent: false,
        is_admin: false,
        agent: "Gordon",
      },
      {
        name: "Dom Lai",
        email: "dom@gmail.com",
        password: await hashPassword("pw3456"),
        membership_no: "Admin#001",
        phone_number: "98765434",
        gender: "male",
        birthday: new Date("1995-05-05"),
        description: "I am Admin",
        icon: "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png",
        is_agent: false,
        is_admin: true,
      },
      {
        name: "Alex Tecky",
        email: "alex@gmail.com",
        password: await hashPassword("pw4"),
        phone_number: "98765435",
        gender: "male",
        birthday: new Date("1994-05-05"),
        description: "I am Admin2",
        icon: "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png",
        is_agent: false,
        is_admin: true,
      },
      {
        name: "Gordon Tecky",
        email: "gordon@gmail.com",
        password: await hashPassword("pw5"),
        phone_number: "98765436",
        gender: "male",
        birthday: new Date("1993-05-05"),
        description: "I am Agent",
        icon: "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png",
        is_agent: true,
        is_admin: false,
      },
    ])
    .returning("id")

  const doctors = await knex("doctors")
    .insert([
      {
        first_name: "Romeo",
        last_name: "Lau",
      },
      {
        first_name: "Dickson",
        last_name: "Tecky",
      },
      {
        first_name: "Beeno",
        last_name: "Tecky",
      },
    ])
    .returning("id")

  const gifts = await knex("gifts")
    .insert([
      {
        gift_item: "Cash coupon",
        description: "$500 cash coupon for any service",
        cost: "100",
        status: "inactive",
      },
      {
        gift_item: "Cash coupon",
        description: "$500 cash coupon for any service",
        cost: "120",
        status: "active",
      },
      {
        gift_item: "Cash coupon",
        description: "$1000 cash coupon for any service",
        cost: "180",
        status: "active",
      },
      {
        gift_item: "Botox Therapy",
        description: "1 free botox treatment",
        cost: "300",
        status: "active",
      },
    ])
    .returning("*")

  const medical_center = await knex("medical_center")
    .insert([
      {
        center: "Sheung Wan",
      },
      {
        center: "Tsim Sha Tsui",
      },
      {
        center: "Central",
      },
    ])
    .returning("id")

  const medical_services = await knex("medical_services")
    .insert([
      {
        service: "Commission",
        point: "0",
        price: "0",
        description: "Commission",
        status: "inactive",
      },
      {
        service: "Add points",
        point: "100",
        price: "0",
        description: "Add 100 points to user",
        status: "inactive",
      },
      {
        service: "Vaccine",
        point: "5",
        price: "500",
        description: "COVID-19 Vaccine Biotech",
        medical_center_id: medical_center[0],
        doctor_id: doctors[0],
        status: "active",
      },
      // {
      //   service: "Vaccine",
      //   point: "5",
      //   price: "500",
      //   description: "COVID-19 Vaccine Biotech",
      //   medical_center_id: medical_center[2],
      //   doctor_id: doctors[1],
      //   status: "active",
      // },
      {
        service: "Botox",
        point: "10",
        price: "1000",
        description: "Botox for face lift",
        medical_center_id: medical_center[0],
        doctor_id: doctors[1],
        status: "active",
      },
      // {
      //   service: "Botox",
      //   point: "10",
      //   price: "1000",
      //   description: "Botox for face lift",
      //   medical_center_id: medical_center[2],
      //   doctor_id: doctors[2],
      //   status: "active",
      // },
      {
        service: "Ultrasound",
        point: "30",
        price: "3000",
        description: "Ultrasound body check",
        medical_center_id: medical_center[1],
        doctor_id: doctors[0],
        status: "active",
      },
      {
        service: "fMRI",
        point: "50",
        price: "5000",
        description: "Full Body fMRI scanning",
        medical_center_id: medical_center[1],
        doctor_id: doctors[0],
        status: "inactive",
      },
      {
        service: "fMRI",
        point: "60",
        price: "7000",
        description: "Full Body fMRI scanning",
        medical_center_id: medical_center[1],
        doctor_id: doctors[0],
        status: "active",
      },
    ])
    .returning("id")

  const medical_history = await knex("medical_history")
    .insert([
      {
        user_id: users[0],
        medical_services_id: medical_services[5],
        service_at_date: new Date("2021-05-20"),
      },
      {
        user_id: users[0],
        medical_services_id: medical_services[5],
        service_at_date: new Date("2021-05-21"),
      },
      {
        user_id: users[0],
        medical_services_id: medical_services[5],
        service_at_date: new Date("2021-05-22"),
      },
      {
        user_id: users[0],
        medical_services_id: medical_services[6],
        service_at_date: new Date("2021-05-23"),
      },
    ])
    .returning("*")

  await knex("gifts_history")
    .insert([
      {
        user_id: users[0],
        gift_item_id: gifts[1].id,
        cost_at_date: gifts[1].cost,
        claim_date: new Date("2021-06-03"),
        expiry_date: new Date("2022-06-03"),
      },
    ])
    .returning("id")

  await knex("point_record")
    .insert([
      {
        user_id: users[0],
        medical_services_id: medical_history[0].medical_services_id,
        points_gained: 50,
        points_gained_date: medical_history[0].service_at_date,
        points_expiry_date: new Date("2022-06-01"),
        created_by: users[3],
      },
      {
        user_id: users[0],
        medical_services_id: medical_history[1].medical_services_id,
        points_gained: 50,
        points_gained_date: medical_history[1].service_at_date,
        points_expiry_date: new Date("2022-06-01"),
        created_by: users[3],
      },
      {
        user_id: users[0],
        medical_services_id: medical_history[2].medical_services_id,
        points_gained: 50,
        points_gained_date: medical_history[2].service_at_date,
        points_expiry_date: new Date("2022-06-01"),
        created_by: users[3],
      },
      {
        user_id: users[0],
        medical_services_id: medical_history[3].medical_services_id,
        points_gained: 60,
        points_gained_date: medical_history[3].service_at_date,
        points_expiry_date: new Date("2022-06-01"),
        created_by: users[3],
      },
    ])
    .returning("id")
}
