window.addEventListener('load', function() {
    logger.debug("Thoses classes can be used :", await loadClassManager.getClassList());

    logger.debug("Get needed classes");
    logger.group();
    const Language = await ClassManager.Language;
    const User = await ClassManager.User;
    const Translation = await ClassManager.Translation;
    const Text = await ClassManager.Text;
    const Access = await ClassManager.Access;
    const Group = await ClassManager.Group;
    const Category = await ClassManager.Category;
    const Article = await ClassManager.Article;
    logger.groupEnd();

    logger.debug("Check for existing resources");
    logger.group();
    let ok = await Language.getAll(0, 1);
    if(ok.length != 0)
        return;
    logger.groupEnd();

    logger.debug("Create used languages");
    logger.group();
    const languages = {
        fr: await new Language("Français").save(),
        en: await new Language("English").save()
    }
    logger.groupEnd();
    
    logger.debug("Create user root");
    logger.group();
    const user = new User();
    user.pseudo = "admin";
    user.email = 'admin@nocturlab.fr';
    user.language = languages.fr;
    user.token = adminToken;
    await user.save();
    logger.groupEnd();

    logger.debug("Create root and gest access");
    logger.group();
    const translation_root_access_desc = [
        await new Translation({
            value: "Permet l'accès à tous les droits",
            author: user,
            language: languages.fr
        }).save(),
        await new Translation({
            value: "Allow to access to all rights",
            author: user,
            language: languages.en
        }).save()
    ];
    const root_access_desc = await new Text(translation_root_access_desc, languages.fr).save();

    const translation_root_access_name = [
        await new Translation({
            value: "Administrateur",
            author: user,
            language: languages.fr
        }).save(),
        await new Translation({
            value: "Administrator",
            author: user,
            language: languages.en
        }).save()
    ];
    const root_access_name = await new Text(translation_root_access_name, languages.fr).save();
    logger.groupEnd();
    
    logger.debug("Create root access");
    logger.group();
    const translation_gest_access_desc = [
        await new Translation({
            value: "Permet l'accès à tous les droits",
            author: user,
            language: languages.fr
        }).save(),
        await new Translation({
            value: "Allow to access to all rights",
            author: user,
            language: languages.en
        }).save()
    ];
    const gest_access_desc = await new Text(translation_gest_access_desc, languages.fr).save();
    
    const translation_gest_access_name = [
        await new Translation({
            value: "Invité",
            author: user,
            language: languages.fr
        }).save(),
        await new Translation({
            value: "Gest",
            author: user,
            language: languages.en
        }).save()
    ];

    const gest_access_name = await new Text({
        originLanguage: languages.fr, 
        translations: translation_gest_access_name
    }).save();

    const accesses = {
        root: await new Access(root_access_desc, root_access_name).save(),
        gest: await new Access(gest_access_desc, gest_access_name).save()
    }
    logger.groupEnd();
    
    logger.debug("Update user root with it's new access");
    logger.group();
    user.accessList = [accesses.root];
    await user.save();
    logger.groupEnd();

    logger.debug("Create group");
    logger.group();
    const groups = {
        gests: await new Group([accesses.gest], gest_access_name).save()
    };
    logger.groupEnd();

    logger.debug("Create user member of gest group");
    logger.group();
    const gest_user = await new User({
        pseudo: "gest",
        email: "gest@nocturlab.fr",
        language: languages.en,
        groupList: [groups.gests]
    }).save();
    logger.groupEnd();

    logger.debug("Create Lenss Category");
    logger.group();
    let text_lenss_technology = await new Text({
        originLanguage: languages.fr,
        translations: [
            await new Translation({
                value: "La Technologie Lenss",
                author: user,
                language: languages.fr
            }).save(),
            await new Translation({
                value: "The Lenss Technologie",
                author: user,
                language: languages.en
            }).save()
        ]
    }).save();

    let text_lenss_category_keywords = [
        await new Text({
            originLanguage: languages.fr,
            translations: [
                await new Translation({
                    value: "lenss",
                    author: user,
                    language: languages.fr
                }).save()
            ]
        }).save(),
        await new Text({
            originLanguage: languages.fr,
            translations: [
                await new Translation({
                    value: "technology",
                    author: user,
                    language: languages.fr
                }).save()
            ]
        }).save(),
        await new Text({
            originLanguage: languages.fr,
            translations: [
                await new Translation({
                    value: "nocturlab",
                    author: user,
                    language: languages.fr
                }).save()
            ]
        }).save()
    ];

    let lenss_category = await new Category({
        author: user,
        description: text_lenss_technology,
        keywords: text_lenss_category_keywords,
        title: await new Text({
            originLanguage: languages.fr,
            translations: [
                await new Translation({
                    value: "Lenss",
                    author: user,
                    language: languages.fr
                }).save()
            ]
        }).save()
    }).save();

    let lenss_sub_category = [
        await new Category({
            category: lenss_category,
            author: user,
            description: await new Text({
                originLanguage: languages.fr,
                translations: [
                    await new Translation({
                        value: "Démarrage",
                        author: user,
                        language: languages.fr
                    }).save(),
                    await new Translation({
                        value: "Starting",
                        author: user,
                        language: languages.en
                    }).save()
                ]
            }).save()
        }).save(),
        await new Category({
            category: lenss_category,
            author: user,
            description: await new Text({
                originLanguage: languages.fr,
                translations: [
                    await new Translation({
                        value: "Approfondir",
                        author: user,
                        language: languages.fr
                    }).save(),
                    await new Translation({
                        value: "Going deeper",
                        author: user,
                        language: languages.en
                    }).save()
                ]
            }).save()
        }).save()
    ]
    logger.groupEnd();

    logger.debug("Create Lenss article");
    logger.group();
    let text_lenss_keywords = [
        await new Text({
            originLanguage: languages.fr,
            translations: [
                await new Translation({
                    value: "lenss",
                    author: user,
                    language: languages.fr
                }).save()
            ]
        }).save(),
        await new Text({
            originLanguage: languages.fr,
            translations: [
                await new Translation({
                    value: "technology",
                    author: user,
                    language: languages.fr
                }).save()
            ]
        }).save(),
        await new Text({
            originLanguage: languages.fr,
            translations: [
                await new Translation({
                    value: "nocturlab",
                    author: user,
                    language: languages.fr
                }).save()
            ]
        }).save()
    ];

    let lenss_article = await new Article({
        author: user,
        description: await new Text({
            originLanguage: languages.fr,
            translations: [
                await new Translation({
                    value: "Apprendre comment utiliser la technologie Lenss",
                    author: user,
                    language: languages.fr
                }).save(),
                await new Translation({
                    value: "Learn how to use the Lenss technology",
                    author: user,
                    language: languages.en
                }).save()
            ]
        }).save(),
        keywords: text_lenss_keywords,
        title: await new Text({
            originLanguage: languages.fr,
            translations: [
                await new Translation({
                    value: "Lenss",
                    author: user,
                    language: languages.fr
                }).save()
            ]
        }).save(),
        category: lenss_category
    }).save();
    logger.groupEnd();
    
    logger.debug("All Done !");
});