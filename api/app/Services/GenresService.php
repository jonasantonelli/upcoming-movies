<?php

namespace App\Services;

use App\Cache\CacheFacade;
use App\Models\Movie;
use GuzzleHttp\Client;

class GenresService
{

    private $url;
    private $apiKey;
    private $client;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('TMDB_API_KEY');
        $this->url = env('TMDB_API_URL');
    }

    /**
     * @param $page
     *
     * @return array|mixed|null
     */
    public function getList()
    {
        try
        {
            $cacheKey = 'genres';
            $cacheContent = CacheFacade::get($cacheKey);

            if(!empty($cacheContent)) {
                $result = json_decode($cacheContent, true);
                return $result;
            }

            $response = $this->client->get($this->url . 'genre/movie/list?api_key=' . $this->apiKey);
            $body = $response->getBody()->getContents();

            $content = json_decode($body);

            if(empty($content) || !isset($content->genres))
            {
                return null;
            }
            $result = [];

            foreach($content->genres as $genre)
            {
                $result[$genre->id] = $genre->name;
            }

            CacheFacade::put($cacheKey, json_encode($result), CacheFacade::EXPIRATION_FROM_60_MINUTES);
            return $result;
        }
        catch (\Exception $err)
        {
            dd($err);
        }

    }

}