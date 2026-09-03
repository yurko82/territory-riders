# Автоматична збірка APK через GitHub Actions

У репозиторії додано workflow `.github/workflows/build-apk.yml`. Він запускається вручну з GitHub Actions або автоматично після push у `main`. Якщо push зроблено на тег формату `v*`, workflow додатково створює GitHub Release і прикріплює APK до цього релізу.

## Одноразове налаштування

1. Увійдіть до [expo.dev](https://expo.dev) тим самим Expo-акаунтом, з яким створювався APK.
2. Створіть персональний Expo access token у налаштуваннях акаунта.
3. У GitHub відкрийте **Settings → Secrets and variables → Actions → New repository secret**.
4. Створіть secret з назвою `EXPO_TOKEN` і вставте token. Значення не потрібно додавати до файлів проєкту, workflow або звичайних змінних.
5. Переконайтеся, що EAS project прив’язаний до Expo-акаунта. Перший запуск із кнопки **Run workflow** покаже помилку з прив’язкою, якщо проєкт ще не має EAS project ID; у такому разі один раз виконайте локально `npx eas-cli@latest init` або створіть EAS project з Expo dashboard.

## Робочий процес

Для звичайної перевірки змін достатньо натиснути **Actions → Build Android APK → Run workflow**. Workflow створює APK на EAS, завантажує його як artifact із терміном зберігання 30 днів і не комітить великий бінарний файл у git.

Для версійного тестового релізу виконайте:

```bash
git tag v1.0.1
git push github v1.0.1
```

Після завершення GitHub Actions з’явиться Release `v1.0.1` з APK asset. Для цього workflow використовує вбудований `GITHUB_TOKEN` із дозволом `contents: write`; окремий GitHub personal access token для створення Release не потрібен.

## Важливі відмінності

| Профіль      | Результат                                    | Використання                                                     |
| ------------ | -------------------------------------------- | ---------------------------------------------------------------- |
| `preview`    | `.apk` через `android.buildType: apk`        | Встановлення на фізичний Android-пристрій і внутрішнє тестування |
| `production` | `.aab` через `android.buildType: app-bundle` | Майбутня публікація в Google Play                                |

EAS Build за замовчуванням орієнтований на AAB для Google Play. Для прямого встановлення на телефон потрібен APK-профіль із `android.buildType: apk` [1]. Expo рекомендує запускати EAS у CI з `EXPO_TOKEN` і прапорцем `--non-interactive`; workflow використовує саме цю модель [2].

## Безпека

Не додавайте `EXPO_TOKEN` у `app.config.ts`, `.env`, workflow YAML або коміти. Якщо token скомпрометовано, відкличте його в Expo та створіть новий GitHub Actions secret. APK-реліз у цьому репозиторії приватний, тому посилання працюватиме для користувачів із доступом до репозиторію.

## References

[1]: https://docs.expo.dev/build-reference/apk/ "Expo Documentation — Build APKs for Android Emulators and devices"
[2]: https://docs.expo.dev/build/building-on-ci/ "Expo Documentation — Trigger builds from CI"
