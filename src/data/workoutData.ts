export interface Exercise {
  id: string;
  name: string;
  equipment: string;
  targetSets: number;
  targetReps: number;
  defaultWeight: number; // 0 for bodyweight
  primaryMuscles: string[];
  secondaryMuscles: string[];
  desc: string;
}

export interface WorkoutDay {
  id: number;
  title: string;
  subtitle: string;
  muscles: string[];
  exercises: Exercise[];
}

export const WORKOUT_DATABASE: WorkoutDay[] = [
  {
    id: 1,
    title: "Грудь + Трицепс",
    subtitle: "Мощная грудная броня и сильные руки",
    muscles: ["Грудные", "Трицепс"],
    exercises: [
      {
        id: "bench-press",
        name: "Жим штанги лёжа",
        equipment: "штанга, скамья",
        targetSets: 4,
        targetReps: 8,
        defaultWeight: 60,
        primaryMuscles: ["pectorals"],
        secondaryMuscles: ["triceps", "deltoids_front"],
        desc: "Лягте на скамью, плотно прижмите стопы к полу. Возьмите штангу хватом шире плеч. Снимите штангу и опустите до касания низа груди. Сделайте небольшую паузу и мощно выжмите её вверх."
      },
      {
        id: "dips",
        name: "Отжимания на брусьях",
        equipment: "брусья",
        targetSets: 4,
        targetReps: 10,
        defaultWeight: 0,
        primaryMuscles: ["pectorals", "triceps"],
        secondaryMuscles: ["deltoids_front"],
        desc: "Примите положение упора на брусьях на прямых руках. Медленно опуститесь вниз, наклоняя торс слегка вперед для максимального включения грудных. Поднимитесь вверх усилием грудных и трицепсов."
      },
      {
        id: "wide-pushups",
        name: "Отжимания широким хватом",
        equipment: "собственный вес",
        targetSets: 3,
        targetReps: 12,
        defaultWeight: 0,
        primaryMuscles: ["pectorals"],
        secondaryMuscles: ["deltoids_front", "triceps"],
        desc: "Примите упор лежа, расставив руки шире плеч. Спина прямая, пресс напряжен. Опуститесь грудью почти до пола, затем разогните руки и вернитесь в исходное положение."
      },
      {
        id: "french-press",
        name: "Французский жим",
        equipment: "штанга, скамья",
        targetSets: 3,
        targetReps: 12,
        defaultWeight: 25,
        primaryMuscles: ["triceps"],
        secondaryMuscles: ["forearms"],
        desc: "Лягте на скамью, удерживая штангу на вытянутых вверх руках. Сгибайте руки только в локтевых суставах, опуская гриф ко лбу или за голову. Локти должны быть зафиксированы."
      },
      {
        id: "close-grip-pushups",
        name: "Узкие отжимания",
        equipment: "собственный вес",
        targetSets: 3,
        targetReps: 12,
        defaultWeight: 0,
        primaryMuscles: ["triceps"],
        secondaryMuscles: ["pectorals", "deltoids_front"],
        desc: "Примите упор лежа, поставив ладони близко друг к другу (большие и указательные пальцы могут соприкасаться). Локти прижмите к корпусу. Отжимайтесь вверх с акцентом на трицепс."
      }
    ]
  },
  {
    id: 2,
    title: "Спина + Бицепс",
    subtitle: "Широкий V-образный силуэт и мощные сгибатели",
    muscles: ["Спина", "Бицепс"],
    exercises: [
      {
        id: "wide-pullups",
        name: "Подтягивания широким хватом",
        equipment: "турник",
        targetSets: 4,
        targetReps: 8,
        defaultWeight: 0,
        primaryMuscles: ["latissimus"],
        secondaryMuscles: ["biceps", "traps"],
        desc: "Возьмитесь за перекладину хватом шире плеч. Тянитесь грудью к перекладине, сводя лопатки в верхней точке и уводя локти вниз."
      },
      {
        id: "underhand-pullups",
        name: "Подтягивания обратным хватом",
        equipment: "турник",
        targetSets: 4,
        targetReps: 8,
        defaultWeight: 0,
        primaryMuscles: ["biceps", "latissimus"],
        secondaryMuscles: ["forearms"],
        desc: "Возьмитесь за перекладину хватом снизу на ширине плеч. Тяните себя вверх, концентрируя нагрузку на бицепсах и верхней части спины."
      },
      {
        id: "close-pullups",
        name: "Подтягивания узким хватом",
        equipment: "турник",
        targetSets: 3,
        targetReps: 10,
        defaultWeight: 0,
        primaryMuscles: ["latissimus"],
        secondaryMuscles: ["biceps", "forearms"],
        desc: "Возьмитесь за турник узким хватом сверху (ладони почти соприкасаются). Подтягивайтесь, стараясь максимально прожать нижнюю часть широчайших мышц спины."
      },
      {
        id: "barbell-row",
        name: "Тяга штанги в наклоне",
        equipment: "штанга",
        targetSets: 4,
        targetReps: 8,
        defaultWeight: 50,
        primaryMuscles: ["latissimus", "traps"],
        secondaryMuscles: ["biceps", "deltoids_back"],
        desc: "Слегка согните ноги в коленях и наклонитесь вперед с прямой спиной. Возьмите штангу и тяните её к низу живота, прижимая локти к бокам и сильно сводя лопатки."
      },
      {
        id: "barbell-curl",
        name: "Подъём штанги на бицепс",
        equipment: "штанга",
        targetSets: 4,
        targetReps: 10,
        defaultWeight: 30,
        primaryMuscles: ["biceps"],
        secondaryMuscles: ["forearms"],
        desc: "Стоя прямо, удерживайте штангу хватом снизу. Согните локти и поднимите штангу по дуге вверх. Локти прижаты к бокам, не раскачивайте тело."
      },
      {
        id: "hammer-curls",
        name: "Молотки с гантелью",
        equipment: "одна гантель",
        targetSets: 3,
        targetReps: 12,
        defaultWeight: 14,
        primaryMuscles: ["biceps", "forearms"],
        secondaryMuscles: [],
        desc: "Удерживайте гантель нейтральным хватом (ладонь направлена внутрь к телу). Выполните сгибание в локте, поднимая гантель к плечу поочередно каждой рукой."
      }
    ]
  },
  {
    id: 3,
    title: "Плечи + Трапеции",
    subtitle: "Широкие 3D плечи и стальной борцовский воротник",
    muscles: ["Плечи", "Трапеции"],
    exercises: [
      {
        id: "military-press",
        name: "Жим штанги стоя",
        equipment: "штанга",
        targetSets: 4,
        targetReps: 8,
        defaultWeight: 40,
        primaryMuscles: ["deltoids_front", "deltoids_medial"],
        secondaryMuscles: ["triceps", "traps"],
        desc: "Поднимите штангу на грудь. Стоя прямо, выжмите штангу над головой, выпрямляя руки. Не прогибайте поясницу, держите корпус в напряжении."
      },
      {
        id: "dumbbell-press-up",
        name: "Жим гантели вверх",
        equipment: "одна гантель, скамья",
        targetSets: 4,
        targetReps: 10,
        defaultWeight: 14,
        primaryMuscles: ["deltoids_front", "deltoids_medial"],
        secondaryMuscles: ["triceps"],
        desc: "Сидя на скамье (или стоя), удерживайте гантель одной рукой у плеча. Выжмите гантель вверх до полного выпрямления руки. Выполните подход на одну руку, затем на другую."
      },
      {
        id: "lateral-raises",
        name: "Махи в стороны",
        equipment: "одна гантель",
        targetSets: 4,
        targetReps: 12,
        defaultWeight: 10,
        primaryMuscles: ["deltoids_medial"],
        secondaryMuscles: ["deltoids_front", "traps"],
        desc: "Держите гантель в опущенной руке. Слегка наклоните корпус вперед и отведите гантель в сторону до высоты плеча. Локоть направлен вверх. Повторите для другой руки."
      },
      {
        id: "upright-row",
        name: "Тяга к подбородку",
        equipment: "штанга",
        targetSets: 4,
        targetReps: 10,
        defaultWeight: 30,
        primaryMuscles: ["deltoids_medial", "traps"],
        secondaryMuscles: ["biceps", "deltoids_front"],
        desc: "Возьмите штангу хватом чуть уже плеч. Подтягивайте её вверх вдоль корпуса к подбородку, разводя локти в стороны и вверх. Держите гриф близко к телу."
      },
      {
        id: "shrugs",
        name: "Шраги",
        equipment: "штанга",
        targetSets: 4,
        targetReps: 15,
        defaultWeight: 60,
        primaryMuscles: ["traps"],
        secondaryMuscles: ["forearms"],
        desc: "Держите штангу в опущенных руках. Поднимайте плечи максимально вверх к ушам за счет усилия трапеций. Задержитесь в пиковой точке на секунду, опустите."
      },
      {
        id: "incline-dumbbell-flyes",
        name: "Разведение гантели в наклоне",
        equipment: "одна гантель",
        targetSets: 3,
        targetReps: 12,
        defaultWeight: 8,
        primaryMuscles: ["deltoids_back"],
        secondaryMuscles: ["traps"],
        desc: "Наклонитесь вперед с прямой спиной, удерживая одну гантель в опущенной руке. Слегка согнув руку в локте, отведите её в сторону-вверх за счет работы заднего пучка дельтовидных мышц. Выполните поочередно для обеих рук."
      }
    ]
  },
  {
    id: 4,
    title: "Ноги + Выносливость",
    subtitle: "Мощный фундамент и железное сердце",
    muscles: ["Ноги", "Выносливость"],
    exercises: [
      {
        id: "squats",
        name: "Приседания со штангой",
        equipment: "штанга",
        targetSets: 4,
        targetReps: 8,
        defaultWeight: 70,
        primaryMuscles: ["quadriceps", "glutes"],
        secondaryMuscles: ["hamstrings", "calves"],
        desc: "Положите штангу на плечи (на трапеции). Удерживая спину ровно и напрягая пресс, приседайте до параллели бедер с полом, разводя колени. Встаньте, с силой толкаясь пятками."
      },
      {
        id: "lunges",
        name: "Выпады",
        equipment: "одна гантель",
        targetSets: 3,
        targetReps: 12,
        defaultWeight: 14,
        primaryMuscles: ["quadriceps", "glutes"],
        secondaryMuscles: ["hamstrings", "calves"],
        desc: "Удерживайте гантель в одной руке или перед собой. Сделайте широкий шаг вперед одной ногой и опуститесь в выпад, пока переднее бедро не станет параллельно полу. Вернитесь."
      },
      {
        id: "romanian-deadlift",
        name: "Румынская тяга",
        equipment: "штанга",
        targetSets: 4,
        targetReps: 10,
        defaultWeight: 60,
        primaryMuscles: ["hamstrings", "glutes"],
        secondaryMuscles: ["latissimus", "traps"],
        desc: "Держите штангу стоя. Медленно наклоняйтесь вперед, отводя таз назад. Ведите штангу вплотную к бедрам. Колени слегка согнуты. Встаньте за счет сжатия ягодиц."
      },
      {
        id: "calf-raises",
        name: "Подъём на носки",
        equipment: "штанга",
        targetSets: 4,
        targetReps: 15,
        defaultWeight: 50,
        primaryMuscles: ["calves"],
        secondaryMuscles: [],
        desc: "Положите штангу на спину (или держите в опущенных руках). Медленно поднимитесь на носки максимально вверх, прожмите икры, затем плавно опуститесь в исходное положение."
      },
      {
        id: "stationary-bike",
        name: "Велотренажёр",
        equipment: "велотренажёр",
        targetSets: 1,
        targetReps: 20, // 20 минут
        defaultWeight: 0,
        primaryMuscles: ["quadriceps", "calves"],
        secondaryMuscles: ["glutes"],
        desc: "Проведите 20-минутную интервальную сессию: 3 минуты легкой разминки, далее чередуйте 30 секунд максимального ускорения и 60 секунд умеренного педалирования."
      }
    ]
  }
];
