<?php

    namespace App\Cache;

    use Illuminate\Support\Facades\Cache;

    class CacheFacade
    {
        public const EXPIRATION_FROM_10_MINUTES = 60 * 10;
        public const EXPIRATION_FROM_60_MINUTES = 60 * 60;

        public static function get($key)
        {
            if(empty($key))
            {
                return;
            }

            return Cache::get($key);
        }

        public static function put($key, $value, $expiration = 300)
        {
            if(empty($key))
            {
                return false;
            }
            Cache::put($key, $value, $expiration);
            return true;
        }

        public static function remove($key)
        {
            if(empty($key))
            {
                return false;
            }

            Cache::forget($key);
            return true;
        }

        public static function exists($key)
        {
            if(empty($key))
            {
                return false;
            }

            return Cache::has($key);
        }
    }