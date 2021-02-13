<template>
    <div class="lesson__prim lesson-prim" id="lesson-notes">
        <div class="lesson-prim__learn" v-if="lesson.review.whatLearn">
            <div class="lesson-prim__learn-title">
                Чему вы научитесь:
            </div>
            <ul class="lesson-prim__learn-list">
                <li v-for="item in lesson.review.whatLearn" :key="item" v-html="item" />
            </ul>
        </div>
        <p class="lesson-prim__text" v-html="lesson.review.frameText" v-if="lesson.review.frameText"/>
        <div class="lesson-prim__learn" v-if="lesson.review.commentary">
            <div class="lesson-prim__learn-title">
                Примечания:
            </div>
            <ul class="lesson-prim__learn-list">
                <li v-for="item in lesson.review.commentary" :key="item">
                    {{ item }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "notes",
        props: {
            lesson: {
                required: true
            }
        }
    }
</script>
