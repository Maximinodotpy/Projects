<script lang="ts">
    import "../app.css";
    import { Label, Select } from "flowbite-svelte";
    import { page } from "$app/stores";
    import type { Data, GroupData } from "$lib/index";
    import { globalData, selectedDate, dates } from "$lib/index";
    import moment from "moment";
    import { browser } from "$app/environment";
    import  { base } from '$app/paths';

    moment.locale("de");
    
    let days = dates.map(date => {
        return {
            value: date,
            name: moment(date).locale("de").format("DD. MMMM YYYY")
        };
    });
    
    async function loadDataFromDay(day: string) {
        globalData.set({});
        console.log($page.url.origin);
        
        const url = `${base}\\Data\\Daten_${day}.xlsx`;
        console.log("Loading data from", url);
        
        const file = await fetch(url);
        console.log("File", file);
        
        const array_buffer = await file.arrayBuffer();
        console.log("File", array_buffer);
    
        // @ts-ignore
        const workbook = XLSX.read(array_buffer);
    
        console.log("Workbook", workbook);
        console.log("Sheet names", workbook.SheetNames);
    
        // Fill in data
        workbook.SheetNames.forEach((sheetName: string) => {
            const worksheet = workbook.Sheets[sheetName];
    
            // Skip sheet named "Vorlage"
            if (sheetName == "Vorlage") {
                return;
            }
    
            // @ts-ignore
            const sheet = XLSX.utils.sheet_to_json(worksheet, {
                header: 1
            }) as string[][];
    
            let new_data: GroupData = {
                name: sheetName,
                source: sheet[1][1],
                type: sheet[2][1],
                layer: sheet[3][1],
                place: sheet[4][1],
                people: []
            };
    
            for (let i = 7; i < sheet.length; i++) {
                const row = sheet[i];
    
                // Check if there is a birthyear and if there is not just put in nan
                let birthyear = row[3] ? parseInt(row[3]) : null;
    
                new_data.people.push({
                    firstname: row[0],
                    lastname: row[1],
                    party: row[2],
                    birthyear: birthyear,
                    since: row[4],
                    tasks: row[5],
                    image: row[6],
                    gender: row[7]
                });
            }
    
            globalData.update(data => {
                data[sheetName] = new_data;
                return data;
            });
        });
    }
    
    $:
    {
        if (browser) {
            console.log("Selected day changed", $selectedDate);
            loadDataFromDay($selectedDate);
        }

        console.log('$page.url', $page.url.pathname);
        console.log('base', base);
    }
</script>

<svelte:head>
    <script src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"></script>
</svelte:head>

<div class="p-4 mx-auto max-w-5xl flex justify-between items-center">
    <div class="flex gap-2 items-center">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Wappen_Schaffhausen_matt.svg" alt="" class="h-14" />

        <div>
            <a href="{base}" class="tracking-widest text-2xl no-underline">Politiklandschaft von Schaffhausen</a>
            <div class="opacity-50">Anmerkungen an <a href="mailto:info@maximmaeder.com" class="underline">info@maximmaeder.com</a></div>
        </div>
    </div>

    <div class="{base + "/" == $page.url.pathname ? '': 'hidden'}">
        <Label>
            <div>Stichtag</div>
            <Select class="mt-1" items="{days}" bind:value="{$selectedDate}"></Select>
        </Label>
    </div>
</div>

<div class="p-4 mx-auto max-w-5xl">
    <slot></slot>
</div>
